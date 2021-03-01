﻿## 《JavaScript异步编程》精读笔记

### 写在前面
- 书籍介绍：《JavaScript异步编程》讲述基本的异步处理技巧，包括PubSub、事件模式、Promises等，通过这些技巧，可以更好的应对大型Web应用程序的复杂性，交互快速响应的代码。理解了JavaScript的异步模式可以让读者写出结构更合理、性能更出色、维护更方便的JavaScript程序。
- 我的简评：js异步编程的科普小书，内容比较全面但不够深入。作为前端开发，了解异步处理机制和优化异步代码非常重要，特别推荐一下《JavaScript异步编程》。
- ！！福利：文末有pdf书籍、笔记思维导图、随书代码打包下载地址哦

### 第一章 深入理解JavaScript事件

#### 1.1.事件的调度
- JavaScript代码用于不会被中断，因为代码在运行期间只需要排队事件即可，而这些事件在代码运行结束之前不会被触发

#### 1.2.异步函数的类型
- 每一种JavaScript环境都有自己的异步函数集
- 在浏览器端，Ajax方法有一个可设置为false的async选项
- 在Node.js中同步的API方法在名称上会有明确的标示如fs.readFileSync
- WebKit的console.log打印输出并没有立即拍摄对象快照，只存储了一个指向对象的引用，等代码返回事件队列才去打印输出快照
- Node的console.log是严格同步的
- 当同一个JavaScript进程正运行着代码时，任何JavaScript计时函数都无法使其他代码运行
- setInterval调度事件设置成0，chrome等浏览器触发频率大约为200次/秒，node大约是1000次/秒
- 替换成while循环时在Chrome中触发频率达到400万次/秒，在node中会达到500万次/秒
- 需要更细粒度的计时，在node中使用process.nextTick，在现代浏览器中使用requestAnimationFrame(主意兼容性)

#### 1.3.异步函数的编写
- 要想确认某个函数异步与否，唯一的方法就是审查其源代码
- 有些函数某些时候是异步的，但其他时候却不是
- 大量延时的话，会造成巨大的计算荷载
- 异步递归有一点很害怕，即在等待任务完成期间，可触发延时的次数是不受限的
- 永远不要定义一个潜在同步而返值却有可能用于回调的函数

#### 1.4.异步错误的处理
- JavaScript也允许抛出异常，随后再用一个try/catch语句块捕获
- 正因如此，Node.js中的回调几乎总是接受一个错误作为其首个参数，这样就允许回调自己来决定如何处理这个错误
- 始终记住，只能在回调内部处理源于回调的异步错误
- 在浏览器环境中，windows.onerror可以捕获异常，如果返回true，则能阻止浏览器默认的错误处理行为
- 在node中，类似的process对象的uncaughtException事件捕获错误，正常情况下，node应用会因未捕获的异常而立即退出
- 但自Node0.8.4起，uncaughtException事件就被废弃了
- domain对象是事件化对象，它将throw转化为error事件

#### 1.5.嵌套式回调的解嵌套
- 最常见的反模式做法是，回调内部再嵌套回调
- 嵌套式回调诱惑我们通过添加更多代码来添加更多特性，而不是将这些特性实现为可管理、可重用的代码片段
- 按照惯例，请避免两层以上的函数嵌套

### 第二章 分布式事件
- 希望使用分布式事件：事件的蝴蝶偶然扇动下翅膀，整个应用到处都引发反应
- PubSub意为发布/订阅，模式来分发事件
- PubSub模式的一些具体表现：Node的EventEmitter对象，Backbone的事件化模型，JQuery的自定义事件

#### 2.1.PubSub模式
- Node中几乎所有的I/O都是EventEmitter对象：文件流、HTTP服务器，甚至是应用进程本身
- 事件处理器本身无法知道自己是从事件队列中还是从应用代码中运行的
- 对于无需即刻发生的事情维持一个队列，并使用一个计时函数定时运行此队列中的下一项任务
- PubSub简化了事件的命名、分发、堆积

#### 2.2.事件化模型
- 只要对象带有PubSub接口，就可以称之为事件化对象
- 每次一个对象上的事件引发了一系列事件并最终对这个对象本身触发了相同的事件，结果就事件循环了
- 事件化模型为我们带来了一种将应用状态变化转换为事件的直观方式

#### 2.3.jQuery自定义事件
- jQuery简化了强大分布式事件系统向任何Web应用程序的移植	
- jQuery提供了非冒泡式的triggerHandler方法
- jQuery的自定义事件允许直接通过DOM来表达DOM相关的事件，不必再把DOM变化的状态复制到应用程序的其他地方

#### 小结
- PubSub模式尤其不适合一次性事件
- 用于解决一次性事件问题的工具叫做Promise

### 第三章 Promise对象和Deferred对象

#### 3.1.Promise极简史
- Promise对象也和EventEmitter对象一样，允许向同一个事件绑定任意多个处理器(堆积技术)	
- 使用Promise对象的最大优势在于，可以轻松从现有Promise对象派生出新的Promise
- 在一般性用法中，Promise、Deferred和Future这三个词大体可算作同义词

#### 3.2.生成Promise对象
- 准确的说，Deffered是Promise的超集，它比Promise多一项关键特性，可以直接触发
- 重申一点：每个Deferred对象都含有一个Promise对象，而每一个Promise对象都代表者一个Deferred对象
- Ajax是演示Promise的绝佳用例：每次对远程服务器额调用都或成功或失败，而我们希望以不同的方式来处理这两种情况

#### 3.3.向回调函数传递数据
- 执行或拒绝Deferred对象时，提供的任何参数都会转发至相应的回调
- resolve/reject可以直接将其上下文传递至自己所触发的回调

#### 3.4.进度通知
- jQuery1.7中为Promise对象新添了一种可以调用无数次的回调progress
- 总结下，Promise对象接受3种回调形式：done、fail、progress

#### 3.5.Promise对象的合并
- Promise对象的逻辑合并技术有一个最常见的用例：判定一组异步任务何时完成

#### 3.6.管道连接未来
- JavaScript中常常无法便捷的执行一系列异步任务，一个主要原因是无法在第一个任务结束之前就向第二个任务附加处理器
- jQuery1.6为Promise对象新增pipe(管道)方法
- promise.promise() === promise

#### 3.7.jQuery与Promises/A的对比
- jQuery使用resolve作为fail的反义词，而Promise/A使用的是fulfill。在Promise/A规范中，Promise对象不管是已履行还是已失败，都是已执行

#### 3.8.用Promise对象代替回调函数
- 理想情况下，开始执行异步任务的任何函数都应该返回Promise对象
- Promise大大有助于让意大利面式的回调趋于平滑，而且也是因为Promise可以非常轻松的协调这种类型的异步任务

### 第四章 Async.js的工作流控制

#### 4.1.异步工作流的次序问题
- 普通的异步代码根本无法保证按照做出调用次序来触发调用的回调

#### 4.3.Async.js的任务组织技术
- Async.js的数据收集方法解决了一个异步函数如何运用于一个数据集的问题
- 异步函数序列的运行：async.series和async.waterfall
- 便利的是Async.js按照任务列表的次序向完工事件处理器传递结果，而不是按照生成这些结果的次序
- Async.js的内核与灵魂：为最常见的异步情景提供简单又省时的工具函数

#### 4.4.异步工作流的动态排队技术
- async.queue的底层基本理念令人想起DMV动态管理视图

### 第五章 worker对象的多线程技术

#### 5.0.写在前面
- 事件能够代替一种特殊的多线程，即应用程序进程可拆分成多个部分同时运行的多线程技术（或者通过中断技术虚拟实现，或者通过多个CPU内核真正实现）
- 尽管只运行在一个线程上确实不理想，但天真的将应用直接分发给多个内核更加糟糕
- 与不同线程进行交互的方式与在JavaScript中进行I/O操作一摸一样
- 同一个进程内的多个线程之间可以分享状态，而彼此独立的进程之间则不能
- 在JavaScript环境中，由worker对象运行的并发代码从来不会分享状态

#### 5.1.网页版的worker对象
- 首要目标，在不损害DOM响应能力的前提下处理复杂的计算
- 几种潜在用法：解码视频、加密通信、解析网页式编辑器
- 基于类似的理由，worker对象看不到全局的window对象和主线程及其他worker线程的任何对象
- 通过postMessage发送的对象会透明的做序列化和反序列化，想想JSON.parse与JSON.stringify
- worker对象可以随意使用XMLHttpRequest
- 还有一个importScripts函数可以同步加载并运行指定的脚本

#### 5.2.cluster带来的Node版worker
- node0.6后推出一个支持多个进程绑定同一个端口的API:cluster（群集）
- 通常为追求最佳性能而使用cluster按每颗CPU内核分化出一个进程
- Node版worker对象由cluster.fork()把运行自己的同一个脚本再次加载成一个独立的进程
- 浏览器可以将任意多余的线程降格为后台任务，而node服务器则要留出计算资源保障其请求处理的主要任务
- 最著名的魔法：多个worker对象试图监听一个TCP端口时，node利用内部消息来允许分享该端口
- 同样，cluster对象有一个主线程和多个worker线程，之间基于一些带有序列化对象或附连字符串的事件
- 为了尽可能减少线程之间的通信开销，线程间分享的状态应该存储在像Redis这样的外部数据库中

### 第六章 异步的脚本加载
- 需要对脚本分而治之，那些负责让页面更好看、更好用的脚本应该立即加载，而那些可以待会再加载的脚本稍后加载

#### 6.1.局限性与补充说明
- 请尽量避免使用内联技术
- 请勿使用document.write
- 只要知道document.write相当于操控DOM时的GOTO语句就行了

#### 6.2.script标签的再认识
- 现代浏览器中的script标签分成了两种新类型：经典型和非阻塞型
- 流行将脚本放在页面body标签的尾部。一方面用户可以更快的看到页面，另一方面可以主动亲密接触DOM而无需等待事件来触发自己
- defer让我们想到静静等待文档加载的有序排队场景，那么async就会让我们想到混乱的无政府状态
- 一个脚本即用defer又用async，则在那些同时支持的浏览器中，async会覆盖defer

#### 6.3.可编程的脚本加载
- 两种合理的方法来抓取并运行服务器脚本：生成Ajax请求并用eval函数处理响应；向DOM插入script标签
- require.js强大的工具包能够自动和AMD技术一起捋顺哪怕最复杂的脚本依赖图
- 如果要求根据条件来加载脚本，请考虑像yepnope这样的脚本加载器。如果站点大量相互依赖的脚本，请考虑require.js

### 写在后面
- pdf书籍、笔记思维导图、随书代码打包下载地址：[https://pan.baidu.com/s/1myOqz7WNXeS9pwm-ovmMVg(提取码：vtzc)](https://pan.baidu.com/s/1myOqz7WNXeS9pwm-ovmMVg)
- 思维导图在线查看：[点击打开](/assets/attachment/fed-book/《JavaScript异步编程》_Trevor Burnham_许青松.svg)
- 得到电子书地址：[点击阅读](https://www.dedao.cn/eBook/XOnaYG1qlM7amvGYerDZOy9JVnXL40BmzOwBkp1NKxoRdb86P2Q5AzgEj9vE5rDo)