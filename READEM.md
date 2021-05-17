# vue - electron - deliver

## install
```sh
vue create deliver

vue add electron-builder
```

## 解决安装electron卡在node install.js 不动问题]
```sh
npm config get registry
# https://registry.npmjs.org/

npm config set registry https://registry.npm.taobao.org

# 如果想换回来，在安装完成后
npm config set registry https://registry.npmjs.org/

# https://npm.taobao.org/mirrors/electron/
```