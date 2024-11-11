## 本地开发

- #### 安装依赖

  ```shell
  pnpm install
  ```
- #### 启动本地开发服务

  ```shell
  pnpm run dev:weapp
  ```
- #### 启动开发者工具预览及调试

  ```shell
  微信开发者工具打开 weapp 文件夹并运行
  ```

## 生产打包

- **运行生产打包命令**

  ```shell
  pnpm run build:weapp
  ```

  

## 发布版本

- **发布预览版本**
- **发布生产版本**



## 所用技术

- [Taro](https://taro-docs.jd.com/docs)
- [React](https://github.com/zenghongtu/react-use-chinese/blob/master/README.md)
- [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [weapp-tailwindcss](https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/taro)
- [lodash](https://www.lodashjs.com/)
- [dayjs](https://day.js.org/zh-CN/)

## 所用组件库

- [@antmjs/vantui](https://antmjs.github.io/vantui/#/home)




## VSCode 配置说明

- 必须安装

  - `eslint`、`tslint`、`stylelint`、`prettier`
  
- 请使用 VScode->Preferences->setting，设置

  ```json
  {
    'eslint.autoFixOnSave': true,
    'tslint.autoFixOnSave': true,
    'eslint.validate': [
      'javascript',
      'javascriptreact',
      'html',
      {
        language: 'typescript',
        autoFix: true,
      },
      {
        language: 'typescriptreact',
        autoFix: true,
      },
    ],
    'prettier.stylelintIntegration': true,
    '[css]': {
      'editor.formatOnSave': true,
    },
    '[scss]': {
      'editor.formatOnSave': true,
    },
  }
  ```

## 目录结构

```text
├── config
├── README.md
├── package.json
├── src
│   ├── constant
│   ├── components
│   ├── hooks
│   ├── store
│   ├── pages
│   ├── styles
│   ├── types
│   ├── utils
|	      ├── index.ts
|	      └── request.ts
│   ├── app.config.ts
│   ├── app.less
│   ├── app.tsx
│   └── index.html
├── types
│   └── global.d.ts
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .npmrc
├── babel.config.js
├── project.config.json
├── project.private.config.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── pnpm-lock.yaml
```

## 开发要求

### 一般规范

- 统一采用`TypeScript`开发，以支持更友好的代码编辑器提示；
- 文件名、目录名统一使用`kebab-case`：小写用`-`连接， 其中如有名词请采用单数形式。比如：`user-manage`；
- 项目中用到的常量命名采用`SNAKE_CASE`：大写并使用`_`连接。统一放在`constant`目录下；
- 代码中用的变量和函数命名采用`camelCase`：所有单词连写在一起，除了第一个单词以外，每个单词的首字母都大写。比如：`firstName`、`lastName`、`getUserName()`；
- `ts`/`tsx`/`less`文件的引入统一采用绝对路径，而不是相对路径，比如: `import HomeSwiper from 'src/components/home-swiper'`；
- 所有提交功能，原则上都需要使用`Form`表单实现。



### 框架API封装

- `Taro`持续跟进`v3`版本，暂不考虑升级至`v4`；
- 小程序页面跳转、网络请求等`API`尽量使用`Taro`内置和封装的`API`，比如：`Taro.navigateTo()`、`Taro.request()`等；
- 在`Taro`没有内置或者封装`API`存在问题时，可以使用小程序对应的`API`。如：`wx.xx`、`my.xx`；
- 网络请求使用`Taro.request()`进行封装，具体接口代码放在`services`目录下；
- 下拉刷新需使用框架封装的`pullRefresh`相关的`API`。



### 组件相关规范

- 页面和组件采用`React hooks`和`Function Component（函数式组件）`进行开发；

- `UI`组件库使用 [@antmjs/Vantui](https://antmjs.github.io/vantui/main/#/home)，原则上不允许另外引入其他组件库；

- 项目范围内的通用的组件可以放在 `components/common/` 目录下，方便其他开发引用；

- 再次强调：针对二次开发的支持：组件、图片等资源 `import` 时需要使用别名/组件路径 `images/xxx.png` 或者 `common/abc`方式引入。切勿使用相对路径；

  > 别名配置如下：'src/components', 'src', 'node_modules/@hyacinth', 'node_modules', './node_modules'

- `toast`组件统一使用`Taro`框架封装的`Taro.showToast()`；

- 长列表渲染需要采用 **虚拟列表** 实现（`Taro`框架内置组件、`Vantui`提供组件都可以采用），一般列表采用直接渲染实现。



### 样式相关规范

- `CSS`方案推荐采用`tailwindcss + weapp-tailwindcss`原子化方案。对于特殊的组件使用`less`文件添加样式时，需要为每个页面或组件提供一个最外层类名包裹以减少样式冲突。如果不使用原子化`CSS`，可以开启`CSS Modules`模块化功能；
- 样式文件不建议多次引入，只在入口`tsx`文件里引入一次即可，比如`order/`目录下的`detail.jsx`和`manage.jsx`可以不引入`less`，只在`index.jsx`里引入一次；
- 每一个目录下通常只允许存在一个`.module.less`文件；
- 在`js`中转换单位使用`@antmjs/vantui`提供的`pxTransform()`方法。



### 交互相关规范

- 详情内容需要跳转至对应的详情页面展示；
- 删除、提交、页面跳转类功能需要弹框二次确认，确认后需自动关闭弹窗；
- 更新类功能（包括添加、删除、编辑、导入等）完成后，需要自动刷新当前列表或详情页数据；
- 凡是网络请求等异步操作需要添加加载指示动画，并在操作结束后`toast`提示操作是否成功；
- 绑定了网络请求的`button`需要添加`loading`展示逻辑，避免重复发起请求；
- 发起网络请求失败后，需根据错误码、错误信息跳转至对应的错误页面或`toast`提示错误信息；
- 网络请求全局超时设置为`10s`，超时重发最多`3`次，重发后仍然超时，需`toast`提示“请求超时”。可根据具体产品需求调整；
- 所有的错误页面需要有返回首页的按钮；
- 所有的列表组件需要有数据为空的文案和样式；
- 所有的详情、介绍字段为空时，需要使用`-`替代；
- 不允许在刚进入小程序时立即请求用户授权信息，以允许用户浏览信息。需要使用授权信息时，需要通过弹框等引导用户手动点击按钮后，再发起授权请求；
- 所有页面的下拉刷新默认开启。通过`Taro`提供的`hook`定制信息提示等功能；
- 需要登录后进行后续操作的，需要弹框提示登录，用户确认后跳转至登录页面。



### 其他三方库使用规范

- 项目状态管理使用 [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) ，具体使用可参考`stores/counter-store`。在`stores/libs/storage`文件中搭配`Taro`的`setStorageSync、getStorageSync、removeStorageSync`实现持久化存储，具体使用可参考`stores/user-store`。搭配`immer`简化处理不可变数据结构。
- `lodash`方法导入建议使用 `import filter from 'lodash/filter';` 的方式，而不是全部导入；
- 时间类工具库使用`dayjs`。



### 性能优化

> 请参考[小程序性能优化指南 | Taro 文档](https://nervjs.github.io/taro-docs/docs/optimized)。

- 针对页面内容渲染较多，导致页面进入时白屏率过高时，可通过`Taro.nextTick()`对非首屏展示的内容进行延时渲染，以减少用户等待时间；

  > 为了方便，可以抽成一个组件在多个地方使用。

  ```tsx
  /**
   * 使用该组件包裹，延迟渲染
   */
  const NextTickComponent: React.FC = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      Taro.nextTick(() => {
        setIsMounted(true);
      });
    }, []);
  
    return isMounted ? <>{children}</> : null;
  };
  
  export default NextTickComponent;
  
  
  // 用法
  <NextTickComponent>
    <Content />
  </NextTickComponent>
  ```

  

- 跳转预加载在 [官方文档](https://link.juejin.cn/?target=https%3A%2F%2Ftaro-docs.jd.com%2Fdocs%2Foptimized%23%E8%B7%B3%E8%BD%AC%E9%A2%84%E5%8A%A0%E8%BD%BD) 有说明，小程序由 A 页面跳转到 B 页面的过程中，从 A 页面发起跳转到 B 页面触发 onLoad，有着 300~400 毫秒的延时。我们可以在跳转的同时，开始请求相对慢的接口，能够在进入B页面时尽快拿到数据；

  ```tsx
  // A页面
  Taro.preload({
    RequestPromise: getData(),
  })
  Taro.navigateTo({ url: '/pages/B/B' })
  
  // B页面
  useEffect(() => {
    Taro.getCurrentInstance().preloadData?.RequestPromise?.then(res => {
      // 获取数据，更新渲染
    })
  }, []);
  ```

- 图片优化。适当压缩图片大小，对于长图可以分割图片，开启`lazyload`懒加载。要注意的是页面要在三屏以上，懒加载功能才会生效，就是说上一屏、当前屏、下一屏的图片是立刻加载的，之外的才会懒加载；

- 对于数据实时性要求较低的文章、商品展示页面，可以自行实现缓存优先策略；

- 项目中比较复杂、更新渲染有性能问题的组件可以尝试使用`Taro`官方提供的[小程序性能优化组件](https://link.juejin.cn/?target=https%3A%2F%2Ftaro-docs.jd.com%2Fblog%2F2021-03-10-taro-3-1-lts%232-%E6%96%B0%E5%A2%9E%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%BB%84%E4%BB%B6-customwrapper)：CustomWrapper来包裹该组件。

  ```jsx
  <CustomWrapper>  
    <GoodsList>
  </CustomWrapper>
  ```




> **注意**
>
> 1. 当代码更新后，开发者工具不会相应更新时。考虑：关闭`Taro`的`cache`缓存、关闭开发者工具热重载；
> 2. `@antmjs/vantui`的组件使用`tailwindcss`类名有时不会生效；
> 3. 最新版微信开发者工具的真机调试有问题，`真机调试1.0`无法运行，推荐切换至`真机调试2.0`，或者回退开发者工具版本；
> 4. `Taro`的`dev`和`build`命令切换运行后，需要在微信开发者工具中清除缓存后，重新启动编译；
> 5. 每次发布版本推荐将`js`转为`es5`版本，提高兼容性。
