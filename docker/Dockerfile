# ==========================================
# 生产环境 Nginx 服务器
# ==========================================
FROM nginx:alpine

# 删除 Nginx 默认的全局配置文件和 conf.d 虚拟主机配置目录
RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d

# 复制自定义的 Nginx 全局配置文件和 conf.d 目录
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/



# 声明容器对外暴露的端口 (80端口用于应用及文档)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
