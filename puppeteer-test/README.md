```
touch config.js

module.exports = {
    BASE_URL: '',
    URL_LIST: [],
    WAIT_PAGE_LOAD: 5000,
}

npm install
npm start
```

## Questions

- 某些页面内容抓取到了，但是截图看到的还是没有内容
  - 临时解决方案是截图前输出到 PDF 或者加一个事件`page.hover('body');`，然后截图。