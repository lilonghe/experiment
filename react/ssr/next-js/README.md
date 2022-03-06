# Questions 

子页面设置 Layout 时，子页面的 Layout 无法使用 MainLayout，直接引用会导致 MainLayout 刷新。
```
return (
    <Provider store={store}>
      {Component.getLayout ? <Layout>
        <Component {...pageProps} />
      </Layout> :
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>}
    </Provider>
)
```

如果换成下面这样就不会刷新，但是同样也有问题，这是两层结构，也就是常见的左边侧边栏，右边上半部分共用，下半部分按照路由显示不同内容，后台中常见的【详情页】一般会这么设计，但是，如果有三层结构呢？
```
return (
    <Provider store={store}>
      <MainLayout>
        {Component.getLayout ? <Layout>
          <Component {...pageProps} />
        </Layout> :
          <Component {...pageProps} />
        }
      </MainLayout>
    </Provider>
)
```


Link 的子元素必须要特定格式  
`react-intl` 下的 `<FormattedMessage />` 渲染出来的是个空组件，只留下文字，没有 a 标签
