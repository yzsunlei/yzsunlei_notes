﻿## 《图解HTTP》精读笔记

### 写在前面
- 书籍介绍：
- 我的简评：
- ！！福利：文末有pdf书籍、笔记思维导图、随书代码打包下载地址哦

#### 第一章 了解Web及网络基础
- 1.1.使用HTTP协议访问Web：从地址栏输入URL时，到Web页面如何呈现；Web是建立在HTTP协议上通信的
- 1.2.HTTP的诞生：为知识共享而规划Web；CERN（欧洲核子研究组织），蒂姆-伯纳斯-李
- 1.3.网络基础TCP/IP：1. HTTP属于TCP/IP内部的一个子集；2. TCP/IP是互联网相关的各类协议族的总称：TCP、IP、DNS、UDP、SNMP等等；3. TCP/IP协议族层次：应用层、传输层、网络层和数据链路层；4. TCP/IP通信传输流：发送端从应用层往下走，接收端从链路层往上走
- 1.4.与HTTP关系密切的协议：IP、TCP和DNS：1. 负责传输的IP协议，两个重要条件是IP地址和MAC地址；2. 确保可靠性的TCP协议，握手使用TCP的标志-SYN和ACK；3. 负责域名解析的DNS服务，提供域名到IP地址之间的解析服务
- 1.5.负责域名解析的DNS服务
- 1.6.各种协议与HTTP协议的关系：1. HTTP协议的职责：生成针对目标Web服务器的HTTP请求报文，对Web服务器请求的内容的处理；2. IP协议的职责：搜索对方的地址，一边中转一边传送；3. TCP协议的职责：将HTTP请求报文分割成报文段，接收报文段
- 1.7.URI和URL：1. URI统一资源标识符；2. 绝对URI的格式：登录信息（认证）、服务器地址、服务器端口号、带层次的文件路径、查询字符串、片段标识符

#### 第二章 简单的HTTP协议
- 2.1.HTTP协议用于客户端和服务器端之间的通信
- 2.2.通过请求和响应的的交换达成通信：1. 请求必定由客户端发出的，而服务端回复响应；2. 请求报文是由请求方法、请求URI、协议版本、可选的请求首部字段和内容实体构成的
- 2.3.HTTP是不保存状态的协议：1. HTTP协议自身不对请求和响应之间的通信状态进行保存；2. 为了实现期望的保持状态功能，于是引入了Cookie技术
- 2.4.请求URI定位资源
- 2.5.告知服务器意图的HTTP方法：1. GET：获取资源；2. POST：传输实体主体；3. PUT：传输文件；4. HEAD：获取报文首部；5. DELETE：删除文件；6. OPTIONS：询问支持的方法；7. TRACE：追踪路径；8. CONNECT：要求用隧道协议连接代理；9. LINK：建立和资源之间的联系；10. UNLINK：断开连接关系
- 2.6.使用方法下达命令：1. 方法的作用在于，可以指定请求的资源按期望产生某种行为
- 2.7.持久连接节省通信量：1. 持久连接：特点是只要连接一端没有明确提出断开连接，则保持TCP连接状态；好处在于减少了TCP连接的重复建立和断开所造成的额外开销，减轻服务器端的负载；HTTP/1.1中，所有连接默认都是持久连接；2. 管线化：不用等待响应就可以直接发送下一个请求
- 2.8.使用Cookie的状态管理：1. Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态

#### 第三章 HTTP报文内的HTTP信息
- 3.1.HTTP报文：1. 大致可以分为报文首部和报文主体两块；2. 两者由最初出现的空行（CR+LF）来划分
- 3.2.请求报文及响应报文的结构：1. 请求行、状态行、首部字段、其他；2. 一般有4种首部，分别是：通用首部、请求首部、响应首部和实体首部
- 3.3.编码提升传输速率：1. 压缩传输的内容编码：gzip（GNU zip）、compress（UNIX系统的标准压缩）、deflate（zlib）、identity（不进行编码）；2. 分割发送的分块传输编码：每一块都会用十六进制来标记块的大小
- 3.4.发送多种数据的多部分对象集合：1. MIME（多用途因特网邮件扩展）机制：允许邮件处理文本、图片、视频等多个不同类型的数据；2. 多部分对象集合包含：multipart/form-data、multipart/byteranges、multipart/form-data、multipart/byteranges；3. http中使用boundary字符串来划分多部分对象集合指明的各类实体
- 3.5.获取部分内容的范围请求：1. 执行范围请求时，会用到首部字段Range来指定资源的byte范围
- 3.6.内容协商返回最合适的内容：1. 内容协商机制是指客户端和服务器端就响应的资源内容进行交涉、然后提供给客户端最为适合的资源；2. 内容协商会以语言、字符集、编码方式等为基准判断响应的资源；3. 涉及的首部字段：Accept、Accept-Chartset、Accept-Encoding、Accept-Language、Content-Language；4. 3种类型的内容协商技术：服务器驱动协商、客户端驱动协商、透明协商

#### 第四章 返回结果的HTTP状态码
- 4.1.状态码告知从服务器端返回的请求结果：1. 状态码中的第一位指定了响应类别
- 4.2.2XX成功：1. 200 OK，从客户端发来的请求在服务器端被正常处理；2. 204 No Content，成功处理，返回的响应报文中不含实体的主体部分；3. 206 Partial Content，客户端进行了范围请求，服务器成功执行
- 4.3.3XX重定向：1. 301 Moved Permanently，永久性重定向，请求的资源已被分配了新的URI，以后应该使用资源现在所指的URI。指定资源路径最后忘记添加斜杠“/”，会产生301状态码；2. 302 Found，临时重定向，请求的资源已被分配了新的URI，希望用户（本次）能使用新的URI访问；3. 303 See Other，请求的资源存在着另一个URI，应使用GET方法定向获取请求的资源；4. 304 Not Modified，服务器资源未改变，可直接使用客户端未过期的缓存；5. 307 Temporary Redirect，临时重定向，与302 Found 有着相同的含义
- 4.4.4XX客户端错误：1. 400 Bad Request，请求报文中存在语法错误；2. 401 Unauthorized，发送的请求需要有通过HTTP认证（BASIC 认证、DIGEST认证）的认证信息；3. 403 Forbidden，请求资源的访问被服务器拒绝了；4. 404 Not Found，无法找到请求的资源。也可以在服务器端拒绝请求且不想说明理由时使用
- 4.5.5XX服务器错误：1. 500 Internal Server Error，服务端在执行请求时发生了错误；2. 503 Service Unavailable，服务器暂时处于超负载或正在停机维护，现在无法处理请求

#### 第五章 与HTTP协作的Web服务器
- 5.1.用单台虚拟主机实现多个域名
- 5.2.通信数据转发程序：代理、网关、隧道：1. 代理：接收客户端发送的请求后转发给其他服务器；每次转发请求或响应时，都会追加写入Via首部信息；2. 网关：能使通信线路上的服务器提供非HTTP协议服务；3. 隧道：确保客户端能与服务器进行安全通信
- 5.3.保存资源的缓存：1. 缓存服务器的优势在于利用缓存可以避免多次从源服务器转发资源

#### 第六章 HTTP首部
- 6.1.HTTP报文首部：1. 首部字段同时存在于请求和响应报文中，并涵盖HTTP报文相关的内容信息
- 6.2.HTTP首部字段：1. HTTP首部字段传递重要信息；2. 使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容；3. HTTP首部字段结构：字段名+字段值；4. 4种HTTP首部字段类型：通用首部字段、请求首部字段、响应首部字段、实体首部字段
- 6.2.5. HTTP/1.1首部字段一览（47种）
- 6.2.5.1. 通用首部字段：1. Cache-Control：控制缓存的行为；2. Connection：逐跳首部、连接的管理；3. Date：创建报文的日期时间；4. Pragma：报文指令；5. Trailer：报文末端的首部一览；6. Transfer-Encoding：指定报文主体的传输编码方式；7. Upgrade：升级为其他协议；8. Via：代理服务器的相关信息；9. Warning：错误通知
- 6.2.5.2. 请求首部字段：1. Accept：用户代理可处理的媒体类型；2. Accept-Charset：优先的字符集；3. Accept-Encoding：优先的内容编码；4. Accept-Language：优先的语言（自然语言）；5. Authorization：Web认证信息；6. Expect：期待服务器的特定行为；7. From：用户的电子邮箱地址；8. Host：请求资源的所在服务器；9. If-Match：比较实体标记（ETag）；10. If-None-Match：比较实体标记（与If-Match相反）；11. If-Range：资源未更新时发送实体Byte的范围请求；12. If-Unmodified-Since：比较资源的更新时间（与If-Modified-Since相反）；13. Max-Forwards：最大传输逐跳数；14. Proxy-Authorization：代理服务器要求客户端的认证信息；15. Range：实体的字节范围请求；16. Referer：对请求中的URI的原始获取方；17. TE：传输编码的优先级；18. User-Agent：HTTP客户端程序的信息
- 6.2.5.3. 响应首部字段：1. Accept-Ranges：是否接受字节范围请求；2. Age：推算资源创建经过时间；3. ETag：资源的匹配信息；4. Location：令客户端重定向至指定URI；5. Proxy-Authenticate：代理服务器对客户端的认证信息；6. Retry-After：对再次发起请求的时机要求；7. Server：HTTP服务器的安装信息；8. Vary：代理服务器缓存的管理信息；9. WWW-Authenticate：服务器对客户端的认证信息
- 6.2.5.4. 实体首部字段：1. Allow：资源可支持的HTTP方法；2. Content-Encoding：实体主体适用的编码方式；3. Content-Language：实体主体的自然语言；4. Content-Length：实体主体的大小（单位：字节）；5. Content-Location：替代对应资源的URI；6. Content-MD5：实体主体的报文摘要；7. Content-Range：实体主体的位置范围；8. Content-Type：实体主体的媒体类型；9. Expires：实体主体过期的日期时间；10. Last-Modified：资源的最后修改日期时间
- 6.2.6. 非HTTP/1.1 首部字段：1. 还有Cookie、Set-Cookie和Content-Disposition等在其他RFC中定义的首部字段
- 6.2.7. End-to-End首部和Hop-by-Hop首部：1. 端到端首部：必须被转发；2. 逐跳首部：只对单次转发有效；3. HTTP/1.1中的逐跳首部字段：Connection、Keep-Alive、Proxy-Authenticate、Proxy-Authorization、Trailer、TE、Transfer-Encoding、Upgrade
- 6.3.HTTP/1.1 通用首部字段：1. Cache-Control；2. Connection；3. Date；4. Pragma；5. Trailer；6. Transfer-Encoding；7. Upgrade；8. Via；9. Warning
- 6.4.请求首部字段：1. Accept；2. Accept-Charset；3. Accept-Encoding；4. Accept-Language；5. Authorization；6. Expect；7. From；8. Host；9. If-Match；10. If-Range；11. If-Unmodified-Since；12. Max-Forwards；13. Proxy-Authorization；14. Range；15. Referer；16. TE；17. User-Agent
- 6.5.响应首部字段：1. Accept-Ranges；2. Age；3. ETag；4. Location；5. Proxy-Authenticate；6. Retry-After；7. Server；8. Vary；9. WWW-Authenticate
- 6.6.实体首部字段：1. Allow；2. Content-Encoding；3. Content-Language；4. Content-Length；5. Content-Location；6. Content-MD5；7. Content-Range；8. Content-Type；9. Expires；10. Last-Modified
- 6.7.为Cookie服务的首部字段：1. Cookie的工作机制是用户识别及状态管理；2. Set-Cookie：开始状态管理所使用的Cookie信息；3. Cookie：服务器接收到的Cookie信息
- 6.8.其他首部字段：1. X-Frame-Options：用于控制网站内容在其他Web网站的Frame标签内的显示问题。目的是为了防止点击劫持攻击；2. X-XSS-Protection：针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器XSS防护机制的开关；3. DNT：拒绝个人信息被收集，表示拒绝精准广告追踪的一种方法；4. P3P：通过利用P3P（在线隐私偏好平台）技术，可以让Web网站上的个人隐私变成一种仅供程序可理解的形式，以达到保护用户隐私的目的

#### 第七章 确保Web安全的HTTPS
- 7.1.HTTP的缺点：1. 通信使用明文（不加密），内容可能会被窃听（1. TCP/IP是可能被窃听的网络；2. 加密处理防止被窃听：通信加密（SSL安全套接层或TLS安全传输层协议的组合使用）、内容加密）；2. 不验证通信方的身份，因此有可能遭遇伪装（1. 任何人都可发起请求；2. 查明对手的证书）；3. 无法证明报文的完整性，所以有可能已遭篡改（1. 接收到的内容可能有误；2. 如何防止篡改（常用的MD5和SHA-1等散列指校验的方法，以及用来确认文件的数字签名方法））
- 7.2.HTTP+加密+认证+完整性保护=HTTPS：1. HTTPS并非应用层的一种新协议。只是HTTP通信接口部分用SSL和TLS协议代替而已；2. SSL是当今世界上应用最为广泛的网络安全技术；3. HTTPS采用共享密钥加密和公开密钥加密两者并用的混合加密机制；4. SSL的慢分两种：一种是指通信慢。另一种是指由于大量消耗CPU及内存等资源，导致处理速度慢

#### 第八章 确认访问用户身份的认证
- 8.0.何为认证：1. 密码：只有本人才会知道的字符串信息；2. 动态令牌：仅限本人持有的设备内显示的一次性密码
；3. 数字证书：仅限本人（终端）持有的信息；4. 生物认证：指纹和虹膜等本人的生理信息；5. IC卡等：仅限本人持有的信息
- 8.1.BASIC认证：1. 从HTTP1.0就定义的认证方式；2. 采用Base64编码方式；3. 不够灵活，且达不到多数Web网站期望的安全性等级
- 8.2.DIGEST认证：1. 同样使用质询/响应的方式，但不会像BASIC认证那样直接发送明文密码；2. 提供防止密码被窃听的保护机制，但不存在防止用户伪装的保护机制
- 8.3.SSL客户端认证：1. 借由HTTPS的客户端证书完成的方式；2. SSL客户端认证采用双因素认证：依靠证书和基于表单认证组合的形式；3. SSL客户端认证必要的费用
- 8.4.基于表单认证：1. 认证多半为基于表单认证；2. Session管理及Cookie应用；3. 一种安全的保存方法，先利用给密码加盐（salt）的方式增加额外信息，再使用散列（hash）函数计算出散列值后保存

#### 第九章 基于HTTP的功能追加协议
- 9.1.基于HTTP的协议
- 9.2.消除HTTP瓶颈的SPDY：1. 探知服务器上是否有内容更新，就必须频繁地从客户端到服务器端进行确认；2. Ajax的解决方法；3. Comet的解决方法；4. SPDY以会话层的形式加入，控制对数据的流动；5. 使用SPDY额外获得的功能：多路复用流、赋予请求优先级、压缩HTTP首部、推送功能、服务器提示功能
- 9.3.使用浏览器进行全双工通信的WebSocket：1. WebSocket协议由IETF定为标准，WebSocket API由W3C定为标准；2. 主要特点：推送功能、减少通信量
- 9.4.期盼已久的HTTP/2.0：1. 目标是改善用户在使用Web时的速度体验；2. 7项技术及讨论：多路复用、TLS义务化、协商、客户端拉/服务器推、流量控制、WebSocket
- 9.5.Web服务器管理文件的WebDAV：1. 可对Web服务器上的内容直接进行文件复制、编辑等操作的分布式文件系统
；2. 新增的一些概念：集合、资源、属性、锁

#### 第十章 构建Web内容的技术
- 10.1.HTML
- 10.2.动态HTML
- 10.3.Web应用
- 10.4.数据发布的格式及语言

#### 第十一章 Web的攻击技术
- 11.1.针对Web的攻击技术：1. HTTP不具备必要的安全功能；2. 在客户端即可篡改请求；3. 针对Web应用的攻击模式
- 11.2.因输出值转义不完全引发的安全漏洞：1. 跨站脚本攻击XSS；2. SQL注入攻击；3. OS命令注入攻击；4. HTTP首部注入攻击；5. 邮件首部注入攻击；6. 目录遍历攻击；7. 远程文件包含漏洞
- 11.3.因设置或设计上的缺陷引发的安全漏洞：1. 强制浏览；2. 不正确的错误消息处理；3. 开放重定向
- 11.4.因会话管理疏忽引发的安全漏洞：1. 会话劫持；2. 会话固定攻击；3. 跨站点请求伪造
- 11.5.其他安全漏洞：1. 密码破解；2. 点击劫持；3. Dos攻击

### 写在后面
- pdf书籍、笔记思维导图、随书代码打包下载地址：[https://pan.baidu.com/s/1a9aNJZYEl8bFw7NlIL46tQ(提取码：etua)](https://pan.baidu.com/s/1a9aNJZYEl8bFw7NlIL46tQ)
- 思维导图在线查看：[点击打开](/assets/attachment/fed-book/《图解HTTP》于均良译_201405.svg)
- 得到电子书地址：[点击阅读](https://www.dedao.cn/eBook/2BeEdA94ma8x6VX2zLjQBNq5dKveMw1RNY0JZPAO1lGbpRyYgonDEr97kMoLmlba)