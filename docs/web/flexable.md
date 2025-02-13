# 移动端适配

## 视口（viewport）

- 在一个浏览器中可以看到的区域就是视口
- 在 pc 端`布局视口`和`视觉视口`是`同一个`
- `移动端`的网页窗口通常较小，默认情况下，`布局视口`是`大于` `视觉视口`的

### 移动端视口划分

- 布局视口（layout viewport）
- 视觉视口（visual layout）
- 理想视口（idea layout）

### 布局视口

默认情况下，一个 pc 端的网页在移动端是如何显示的？

- 第一，他会按照宽度为 980px 来布局一个页面的盒子和内容
- 第二，为了能够在手机中完整的显示网页内容，浏览器会对页面进行等比例缩放，那么内容也就随之变小

相对于 980px 布局的这个视口，称之为布局视口（layout viewport）

布局视口的`默认宽度是980px`

### 视觉视口

如果默认情况下，我们按照 980px 显示内容，`那么右侧就会有一部分区域无法显示`，所以手机浏览器会``默认对页面进行缩放以显示到用户的可见区域`中

`显示在用户可见区域的这个视口`，就是视觉视口（visual viewport）

### 理想视口

因为默认情况下，移动端的布局视口默认宽度是 980px，但这种不利于我们开发

所以就有了理想视口的概念，所谓理想视口就是，`布局视口和视觉视口一致`

可以通过`meta的viewport`设置 layout viewport 的宽度和缩放，以满足正常在一个移动端的视口布局

| 值 | 可能附加的值 | 描述 |
| --- | --- | --- |
| width | 一个正整数，或字符串 device-width(`表示宽度和视口一样`) | 定义 viewport 的宽度 |
| height | 一个正整数，或字符串 device-width | 定义 viewport 的高度`未被任何浏览器使用` |
| initial-scal | 一个 0.0 和 10.0 之间的正数 | 定义设备宽度与 viewport 大小之间的缩放比例 |
| maximum-scal | 一个 0.0 和 10.0 之间的正数 | 定义缩放的最大值，必须大于 minimum-scal,否则表现将不可预测 |
| minimum-cal | 一个 0.0 和 10.0 之间的正数 | 定义缩放的最小值，必须小于 maximum-scal,否则表现将不可预测 |
| user-scalable | yes 或 no | 默认是 yes，如果设置为 no，将无法缩放当前页面。浏览器可以忽略此规则 |

因为`user-scalable`属性浏览器可以忽略，所以移动端一般如下设置

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0 maximun-scal=1.0 minimun-scal=1.0"
/>
```

## 1. 百分比布局

- 因为不同属性的百分比值，相对的可能是不同的参照物，所以百分比往往难以统一
- 所以百分比布局在移动端适配中很`少见`

## 2. rem 单位+动态 HTML 的 font-size

### 2.1.方案一：媒体查询

- 可以通过媒体查询来设置不同尺寸范围内的屏幕 html 的 font-size 尺寸

缺点

- 需要针对不同的屏幕编写大量的媒体查询
- 如果动态的修改尺寸，不会实时的进行更新，因为媒体查询写的是一个范围

### 2.2 方案二：js 动态计算 fontSize 大小

- 获取视口的大小
- 监听视口变化事件，动态的设置 fontSize 的大小

```html
<style>
      .box {
        width: 5rem;
        height: 5rem;
        background-color: #aff;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
  <script>
    let htmlEl = document.documentElement;
    window.addEventListener("resize", () => {
      // 获取视口的宽度
      let htmlWidth = htmlEl.clientWidth;

      let htmlFontSize = htmlWidth / 10;
      // 设置html的font-size大小
      htmlEl.style.fontSize = htmlFontSize + "px";
    });
  </script>
```

### 2.3.方案三：使用三方库 lib-fixible

直接引入三方库即可

`会出现一个问题` ，没有给 span 单独设置字体大小的情况下，会继承 html 的字体大小，会很大，所以要给 body 单独设置一个字体大小，让后续没有设置字体大小的元素继承 body

```html
<div class="box">
  <span>dfsdfsdf</span>
</div>
```

### 2.4.rem 单位的换算

#### 2.4.1.方案一：手动计算

- 假设有一个在 375px 屏幕上，100px 宽度和高度的盒子
- 我们需要将 100px 转换成对应的 rem 值
- 100/37.5=2.6667rem

#### 2.4.2.方案二：less 混入

- 因为使用 js 动态的将整个屏幕分成 10 份
- 给的设计稿是 375 的,每份是 37.5，font-size 的大小也是 37.5px
- 所以 100px = 100 / 37.5 = 2.6667rem
- 相比方案一简单些

```less
.pxToRem(@px) {
  result: 1rem * (@px / 37.5);
}

.box {
  width: .pxToRem(100) [result];
  height: .pxToRem(100) [result];
}
.p {
  font-size: .pxToRem(14) [result];
}
```

#### 2.4.3. 方案三：postcss-pxtorem

借助 webpack 的插件完成，后续补上

## 3. vw 单位布局

- vw 是相对于视口的宽度的
- 1vw = 视口宽度/100

### 3.1.vw 相比于 rem 的优势

- 不需要计算 html 的 font-size 的大小，也不需要给 html 设置一个 font-size 属性
- 不会因为设置 html 的 font-size 大小，而必须给 body 设置一个 font-size 大小，防止没有设置 rem 的元素继承 html 的大小
- 不依赖 font-size 的尺寸，不用担心 html 的 font-size 大小被篡改，而影响页面的布局
- vw 相对于 rem 更加具有语义化，1vw 刚好是 1/100 的 viewport 的大小
- 可以具备 rem 之前的所有有点

### 3.1.2.计算 vw 的值

#### 3.2.1.方案一：手动计算

- 假设有一个在 375px 屏幕上，100px 宽度和高度的盒子
- 我们需要将 100px 转换成对应的 vw 值
- 100/3.75=26.667vw

#### 3.2.2.方案二：less 混入

- 因为 1vw = 视口的 1%
- 给的设计稿是 375 的,每份是 3.75px
- 所以 100px = 100 / 3.75 = 26.667vw
- 相比方案一简单些

```less
.pxToRem(@px) {
  result: 1vw * (@px / 3.75);
}

.box {
  width: .pxToRem(100) [result];
  height: .pxToRem(100) [result];
}
.p {
  font-size: .pxToRem(14) [result];
}
```

#### 3.2.3. 方案三：postcss-px-to-vierport-8-plugin

借助 webpack 的插件完成，后续补上

## 4. flex 的弹性布局
