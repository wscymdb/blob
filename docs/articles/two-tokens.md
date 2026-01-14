# 目的

- 提升用户体验：避免用户频繁重新登录，提供无缝的使用体验。
- 安全性：通过短期有效的访问 token 和长期有效的刷新 token 组合，减少 token 被盗用的风险。
- 自动化管理：在 token 过期前自动获取新的 token，确保应用程序能够持续访问受保护的资源。
- 减少中断：避免因 token 过期导致的请求失败，保持应用的正常运行。
- 这种机制通常通过在后台定期检查 token 的有效性，并在必要时使用刷新 token 获取新的访问 token 来实现。

# 实现方式

使用双 Token 机制，即访问 Token（Access Token）和刷新 Token（Refresh Token）。

# 实现思路(前端)

1. 使用双 token access_token 和 refresh_token ，access_token 用于请求资源，refresh_token 用于刷新 access_token 一般情况下 refresh_token 的有效期会比 access_token 长很多
2. 登陆成功后，服务器会返回 access_token 和 refresh_token，客户端需要将这两个 token 存储起来 之后每次请求都会携带 access_token
3. 当 access_token 过期时，会触发一个请求，请求刷新 access_token，这个请求会带上 refresh_token，服务器会验证 refresh_token 的有效性，如果有效，则返回新的 access_token
4. 客户端收到新的 access_token 后，会更新本地存储的 access_token，并携带新的 access_token 重新发起刚刚失败的请求

# 前端实现

## axios 封装

```tsx
import Axios from 'axios';

interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

/*
  无感刷新token的原理如下
  1.使用双token  access_token和refresh_token ，access_token用于请求资源，refresh_token用于刷新access_token 一般情况下 refresh_token的有效期会比access_token长很多
  2.登陆成功后，服务器会返回access_token和refresh_token，客户端需要将这两个token存储起来 之后每次请求都会携带access_token
  3.当access_token过期时，会触发一个请求，请求刷新access_token，这个请求会带上refresh_token，服务器会验证refresh_token的有效性，如果有效，则返回新的access_token
  4.客户端收到新的access_token后，会更新本地存储的access_token，并携带新的access_token重新发起刚刚失败的请求
 */

const axiosInstance = Axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

// 用于标记是否正在刷新 token。
let isRefreshing = false;

//存储所有在刷新 token 期间失败的请求。
let failedQueue: FailedRequest[] = [];

// 在刷新完成后，处理队列中的所有请求，重新发起它们。
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
};

// 请求拦截器
axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken'); // 从内存或状态管理中获取 Access Token

  // 除了login接口，其他接口都需要带上token
  if (token && config.url !== '/login') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
// 参数一成功的回调 只有status为2xx才会进入这个回调 反之则进入失败的回调
// 参数二失败的回调
axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx的状态码才会进到这个回调 反之则进入失败的回调
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // 如果响应状态码为403，并且原始请求没有重试过，则尝试刷新 Access Token
    // 这里的判断逻辑是根据后端来的，如果后端返回的状态码是403，则表示token过期，需要刷新token
    if (error.response?.status === 403 && !originalRequest?._retry) {
      // 为了解决刷新token时，多个请求同时刷新token的问题，这里使用了一个队列来存储所有在刷新 token 期间失败的请求
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };

              return axiosInstance(originalRequest);
            }
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      originalRequest._retry = true; // 标识原始请求已经重试过
      console.log(isRefreshing);

      return new Promise(async (resolve, reject) => {
        let newAccessToken: string | null = null; // 用于存储新的 accessToken

        try {
          const { accessToken, refreshToken } = await refreshTokens(); // 刷新 Access Token

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          newAccessToken = accessToken;

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          };

          // processQueue(null, accessToken);
          resolve(axiosInstance(originalRequest)); // 重试原始请求
        } catch (error) {
          processQueue(error, null);
          reject(error);
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('refreshToken');
          // window.location.href = '/login';
        } finally {
          setTimeout(() => {
            isRefreshing = false;
            processQueue(null, newAccessToken);
          }, 1000);
        }
      });
    }
    return Promise.reject(error);
  },
);

interface IToken {
  accessToken: string;
  refreshToken: string;
}
async function refreshTokens() {
  try {
    // 发送刷新请求，获取新的 Access Token
    const response = await axiosInstance.post<any, IToken>('/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    return response;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error; // 继续抛出错误以便在拦截器中处理
  }
}

export default axiosInstance;

/**
 * FQA
 * Q：假如现在token过期了 这时候有10个请求并发  现在有一个请求有响应了 返回的status是403 这时候就会触发重新请求token 后面又有5个请求进来了 因为这时候isRefreshing=true 所以会被推入到队列中 这时重新请求token的接口已经返回了新的token 然后isRefreshing=false 还剩下的4个请求现在响应了 但是此时isRefreshing=false 所以又会重新请求token
 * A:后续补充
 */
```

## 业务代码

```tsx
import axiosInstance from '@/services/request';
import { Button, Flex, Form, Input, Space } from 'antd';
import { CSSProperties, memo } from 'react';

const style: CSSProperties = {
  width: 500,
  height: 300,
  padding: 20,
  borderRadius: 10,
  border: '1px solid #ccc',
  margin: '100px auto',
};

interface IToken {
  accessToken: string;
  refreshToken: string;
}

export default memo(() => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { accessToken, refreshToken } = await axiosInstance.post<any, IToken>(
      '/login',
      {
        ...values,
      },
    );
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const handleClick = async () => {
    const res = await axiosInstance.get('/protected');
    console.log(res);
  };

  // 并发多个请求
  const concurrency = () => {
    Array.from({ length: 10 }).forEach(() => {
      axiosInstance.get('/protected');
    });
  };

  return (
    <div className="login-page" style={style}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{
          username: 'admin',
          password: '123456',
        }}
      >
        <Form.Item label="用户名" name="username">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="end">
            <Space>
              <Button type="primary" onClick={form.submit}>
                登陆
              </Button>

              <Button type="primary" onClick={handleClick}>
                普通接口
              </Button>
              <Button type="primary" onClick={concurrency}>
                并发两个接口
              </Button>
            </Space>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
});
```

# 后端实现

使用 Nodejs + Koa + JWT 实现

```js
const Koa = require('koa');
const Router = require('@koa/router');
const jwt = require('jsonwebtoken');
const bodyParser = require('koa-bodyparser');

const users = [
  { userId: 1, username: 'admin', password: '123456' },
  { userId: 2, username: 'user2', password: 'password2' },
];

const app = new Koa();
const router = new Router();

const SECRET_KEY = 'mysecretkey';
const REFRESH_SECRET_KEY = 'myrefreshsecretkey';
const accessTokens = new Map();
const refreshTokens = new Map();

app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  // ctx.set(
  //   "Access-Control-Allow-Headers",
  //   "Accept, Accept-Encoding, Accept-Language, Connection, Content-Length, Content-Type, Host, Origin, Referer, User-Agent,Authorization"
  // );
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204; // No Content
    return;
  }

  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '2s' });
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  });

  accessTokens.set(accessToken, userId);
  refreshTokens.set(refreshToken, userId);
  return { accessToken, refreshToken };
};

router.post('/login', (ctx) => {
  try {
    const { username, password } = ctx.request.body;

    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid username or password' };
      return;
    }

    const tokens = generateTokens(user.userId);
    ctx.body = tokens;
  } catch (error) {
    console.log(error);
  }
});

router.post('/refresh', (ctx) => {
  const { refreshToken } = ctx.request.body;
  console.log(refreshToken);

  if (!refreshToken) {
    ctx.status = 400;
    ctx.body = { error: 'refresh token is required' };
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    const tokens = generateTokens(payload.userId);
    ctx.body = tokens;
  } catch {
    ctx.status = 403;
    ctx.body = { error: 'Invalid refresh token' };
  }
});

router.get('/protected', (ctx) => {
  const authHeader = ctx.headers.authorization;
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization header is required' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    ctx.body = { message: 'Protected resource', userId: payload.userId };
  } catch (error) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid token' };
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
