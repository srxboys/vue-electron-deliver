# vue - electron - deliver

## install
```sh
vue create deliver

vue add electron-builder
```

## 运行
```sh
# 运行 electron
# 需要在 package.json 中添加
"main": "background.js",
```

## `electron`卡在`node install.js`
```sh
npm config get registry
# https://registry.npmjs.org/

npm config set registry https://registry.npm.taobao.org

# 如果想换回来，在安装完成后 (我没有换 taobao，还是用这个，并用下面的 electron_mirror 配置的)
npm config set registry https://registry.npmjs.org/

# https://npm.taobao.org/mirrors/electron/
```

- 还是不行
- [解决安装`electron`在`node install.js`卡住的问题](https://blog.csdn.net/weixin_43398820/article/details/104053816)
```sh
# .npmrc 中 添加
electron_mirror="https://npm.taobao.org/mirrors/electron/"
```


- 还是不行 - 我没有用这个
- [知乎 - electron 安装失败，Electron failed to install correctly](https://zhuanlan.zhihu.com/p/108380451)