## 《深入浅出Serverless-技术原理与应用实践》

### 写在前面
- 书籍介绍：本书详细介绍Serverless的技术原理、应用架构，以及与之相关的各种技术主题，而且深入讲解了公有云和私有云下的各种主流Serverless平台、架构和工具的原理、架构和使用细节。
- 我的简评：暂无
- ！！福利：文末有pdf书籍、笔记思维导图、随书代码打包下载地址哦

### 第1章 Serverless基础
#### 1.1.什么是Serverless
- 1. Serverless不是具体的一个编程框架、类库或者工具。
- 2. Serverless是一种软件系统架构思想和方法，它的核心思想是用户无须关注支撑应用服务运行的底层主机
- 3. 所谓“无服务器”，并不是说基于Serverless架构的软件应用不需要服务器就可以运行，其指的是用户无须关心软件应用运行涉及的底层服务器的状态、资源（比如CPU、内存、磁盘及网络）及数量

#### 1.2.Serverless带来的价值
- 1. 降低运营复杂度：用户无须再持续监控和维护具体服务器的状态，只需要关心应用的整体状态
- 2. 降低运营成本：Serverless应用是按需执行的；用户只需要为处理请求的计算资源付费
- 3. 缩短产品的上市时间：（开发）应用的功能被解构成若干个细粒度的无状态函数，功能与功能之间的边界变得更加清晰，功能模块之间的耦合度大大减少；（部署）应用所依赖的服务（如数据库、缓存等）可通过平台直接获取，用户无须关心底层细节，部署复杂度降低
- 4. 增强创新能力：用户可以用更短的时间、更少的投入尝试新的想法和创意

#### 1.3.Serverless的技术实现
- 1. 目前市场上比较流行的Serverless工具、框架和平台：1、AWS Lambda；2、Azure Functions；3、OpenWhisk；4、Kubeless；5、Fission；6、OpenFaaS；7、Fn
- 2. 业界各类Serverless实现按功能，主要为应用服务提供两个方面的支持：函数即服务（FaaS）以及后台即服务（Baas）
- 3. FaaS提供了一个计算平台，上面应用以一个或多个函数的形式开发、运行和管理。大多数FaaS平台基于事件驱动的思想，可以根据预定义的事件触发指定的函数应用逻辑
- 4. BaaS平台将应用所依赖的第三方服务，如数据库、消息队列及存储等服务化并发不出来，用户通过向BaaS平台申请所需要的服务进行消费，不需要关心这些服务的具体运维

#### 1.4.Serverless应用架构
- 1. 传统应用架构：应用程序部署在数据中心的主机上，数据库也一样，部署在数据中心的主机上，由用户负责运维
- 2. Serverless架构：应用程序部署在Serverless平台上，应用的功能点变成若干个函数定义，部署在FaaS中
- 3. 两种架构的比较

#### 1.5. Serverless的技术特点
- 1. 按需加载：应用的加载和卸载由Serverless云计算平台控制
- 2. 事件驱动：应用的加载和执行由事件驱动
- 3. 状态非本地持久化：应用的状态不能，也不会保存在其运行的服务器上
- 4. 非会话保持： 应用不再与特定的服务器关联，Serverless架构更适合无状态的应用
- 5. 自动弹性伸缩：云计算平台动态的保证有足够的计算资源和足够数量的应用实例对请求进行处理
- 6. 应用函数化： 每一个调用完成一个业务动作，应用会被分解成多个细颗粒度的操作
- 7. 依赖服务化： 所有应用依赖的服务都是一个个后台服务，应用通过BaaS方便获取，而无须关系底层细节

#### 1.6. Serverless的应用场景
- 1. Web应用：可以很好的支持各类静态和动态的Web应用
- 2. 移动互联网：自动弹性扩展对接移动端的流量，开发者可以更轻松的应对突发的流量增长
- 3. 物联网：帮助物联网应用对接不同的数据输入源
- 4. 多媒体处理：通过特定事件触发对用户上传的图片和视频信息进行加工和转换
- 5. 数据及事件流处理：用于对一些持续不断的事件流和数据流进行实时分析和处理，对事件和数据进行实时的过滤、转换和分析，进而触发下一步的处理
- 6. 系统集成：用户可以更专注于所需的集成逻辑，只编写和集成相关的代码逻辑

#### 1.7. Serverless的局限
- 1. 控制力：用户对底层的计算资源没有控制力
- 2. 可移植性：用户将一个平台上的Serverless应用移植到另一个平台时所需要付出的成本会比较高
- 3. 安全性：不同用户的应用，或者同一用户的不同应用在运行时可能公用底层的主机资源
- 4. 性能：应用的首次加载及重新加载的过程将产生一定的时延
- 5. 执行时长：大部分Serverless平台对FaaS函数的执行时长存在限制
- 6. 技术成熟度：相关平台、工具和框架还处在一个不断变化和演进的阶段

### 第2章 Serverless与相关技术

#### 2.1.云计算
- 1. 当前云计算模式可以分为基础架构即服务（IaaS）、平台即服务（PaaS）以及软件即服务（SaaS）
- 2. IaaS减轻了用户管理基础架构的负担；PaaS则是在这个基础上让用户只关注应用服务；PaaS平台提供了应用的运行环境（如应用运行时）、应用依赖的服务（如数据库、中间件、负载均衡、构建服务、发布服务等）以及底层所需的计算资源。
- 3. Serverless架构实现的一个重要基础是函数即服务（FaaS）。相对于PaaS而言，FaaS有更高的抽象程度和更低的管理成本。相对于SaaS来说，FaaS用户有更高的控制力和灵活度

#### 2.2.微服务
- 1. 传统的应用倾向于在一个应用中囊括多个不同的功能模块，SOA时代提倡的是应用系统对外暴露功能并提供服务，通过服务的组合形成新的应用
- 2. 微服务架构提倡将应用化整为零，减小颗粒度
- 3. 微服务的出现，突破了传统单体应用架构的制约，增加了应用架构的灵活度，为应用的开发和交付带来了价值：更清晰的权责、更快速的开发和交付节奏、更灵活的资源扩展
- 4. 落地实践微服务架构时，用户必须思考的挑战：团队组织变化、运维复杂度、微服务治理
- 5. Serverless和微服务两种架构都强调功能的解构，都强调最小的成员单位专注于做一件事情，做好一件事情。
- 6. 微服务架构中的最小成员单位是微服务，而Serverless架构中的最小成员单位是函数
- 7. 两者侧重点不同，微服务强调化整为零，提高应用架构灵活度，Serverless强调的是减负，即将服务器移除用户的管理职责范围

#### 2.3.容器
- 1. 容器技术以一种称为容器镜像的打包方式为基础，扩大了应用交付件的边界
- 2. 容器镜像中不仅包含编译构建后的应用，还包含应用所依赖的中间件、类库和操作系统设置等配置，可以为应用的运行提供一个完整的环境
- 3. 传统的操作系统只管理一台主机上的CPU、内存、磁盘和网络资源，而Kubernetes则掌握着数据中心中成百上千台主机的资源

#### 2.4.PaaS
- 1. PaaS平台和Serverless平台之间的主要差异在于：管理的颗粒度不同；应用部署模式不同；作业类型不同，对于实例的态度不同
- 2. OpenShift是基于Kubernetes的一个开源容器PaaS平台

#### 2.5.FaaS
- 1. FaaS是当前Serverless实现的技术基础。但Serverless并没有要求一定要基于FaaS实现
- 2. FaaS的特点同时是Serverless平台的特点：1、抽象了底层计算资源；2、按使用量付费；3、自动弹性扩展；4、事件驱动
- 3. 一个FaaS平台的架构中包含如下主要组件：函数定义、函数实例、控制器、事件、事件源、触发规则、平台服务

#### 2.6.BaaS
- 1. BaaS所覆盖的范围比较广泛，覆盖了应用 可能依赖的一切第三方服务，如对象存储服务、数据库服务、身份验证服务即数据分析服务等
- 2. 笔者认为广义的Serverless包含FaaS和BaaS两个方面，FaaS解决了应用本身的“无服务器”化，BaaS解决了应用以阿里的第三方服务的“无服务器”化

#### 2.7.NoOps
- 1. 越来越多的企业基于多年来积累呃运维经验构建运维知识库，通过AI、机器学习等技术尝试智能化运维
- 2. “无服务器”与“无人运维”：用户不需要对底层的基础架构进行运维，但还是需要有人对应用的整体运营状态进行维护

#### 2.8.DevOps
- 1. DevOps是一种IT的治理理念，强调和谐的开发和运维的协作，以便为IT提供更可靠和更高质量的交付
- 2. DevOps所倡导的协作、分享和精益的文化对Serverless的推行而言有着很大益处

#### 2.9.云原生应用
- 1. 所谓的云原生应用是指充分利用云平台的各种功能和服务所设计的应用程序。强调未来的应用要充分利用云上的各种设施和功能更，最大限度的加速应用的开发、部署和运营，使云的价值最大化
- 2. Serverless应用满足了云原生应用的定义，充分利用了云平台的各种能力，极大的提高了应用开发、交付和运维的效率

### 第3章 Serverless的实现

#### 3.1.Serverless技术的发展
- 1. Serverless相关的资源：Serverless平台、Serverless框架、Serverless工具、编程语言库、后台服务

#### 3.2.Serverless与公有云
- 1. Amazon Web Services
- 2. Microsoft Azure
- 3. Google Cloud Platform
- 4. Webtask
- 5. Hyper.sh
- 6. 阿里云
- 7. 腾讯云

#### 3.3.Serverless与私有化部署
- 1. OpenWhisk
- 2. Fission
- 3. Kubeless
- 4. OpenFaaS
- 5. Fn

#### 3.4.Serverless框架和工具
- 1. Serverless Framework：一款帮助用户构建、部署和管理不同Serverless平台之上应用的命令行工具
- 2. Chalice：基于Python实现的一个简单框架，用于简化用户定义和部署AWS Lambda应用
- 3. Claudia.js ：是一个AWS Lambda的部署工具
- 4. Apex：是一款用Go语言编写的AWS Lambda工具，帮助用户部署和管理AWS Lambda应用
- 5. Spring Cloud Function： 希望提供一种与具体平台无关的Serverless应用的开发模式
- 6. AWS SAM：AWS推出的一个Serverless应用的定义规范

#### 3.5.Serverless后台服务
- 1. 共有云服务
- 2. 私有云服务

### 第4章 AWS Lambda
- 4.1.AWS
- 4.2.AWS Serverless
- 4.3.AWS Lambda概述
- 4.4.第一个Serverless应用
- 4.5.权限控制
- 4.6.编程模型
- 4.7.事件驱动
- 4.8.日志监控
- 4.9.开发辅助
- 4.10.运行限制
- 4.11.配置与部署

### 第5章 Azure Functions
- 5.1.Microsoft Azure
- 5.2.Azure Functions概述
- 5.3.创建Azure Serverless应用
- 5.4.Azure Functions命令行
- 5.5.深入了解Azure Functions
- 5.6.私有云部署

### 第6章 容器技术基础

#### 6.1.什么是容器
- 1. 了解容器技术，首先可以从容器、容器镜像、镜像仓库和容器编排几个概念开始学习
- 2. 从技术上，容器其实就是操作系统的一个受控进程
- 3. 容器镜像是Docker对应用进行打包的一个格式。容器镜像不仅包含应用，还可以包含应用的依赖组件和配置，如类库、中间件和操作系统配置等
- 4. 容器镜像的拥有者可以将容器镜像发布到镜像仓库中，容器镜像的使用方则可以通过镜像仓库下载所需的镜像
- 5. 共有仓库为互联网上的公共仓库，如Docker公司的Docker HUb。私有仓库则为企业在私有化环境中通过Docker Distribution、Red Hat Quay及VMware Harbor等软件搭建的镜像仓库
- 6. Docker是一个容器引擎，在当前的应用架构下，应用往往不只是部署在一台主机上。用户需要管理的也不只是一台主机，而是上百台或上千台的计算集群。用户需要一种有效的手段去管理成百上千台主机上的容器引擎
- 7. 容器技术对Serverless计算平台的支持：容器环境和镜像对FaaS函数应用提供了一种可以适配各类编程语言的运行环境和部署格式；容器引擎可以为Serverless FaaS函数实例的运行提供隔离和可控的环境；容器编排平台可以为Serverless应用的弹性扩展提供所需的各类计算资源

#### 6.2.Docker
- 1. Vagrant支持管理多种虚拟化工具的虚拟机，包括开源的VirtualBox、商业软件VMWare Workstation和微软的Hyper-V
- 2. 执行命令docker run运行一个容器；执行docker ps可以查看系统正在运行的容器列表；通过命令docker exec用户可以在容器环境内执行命令；通过docker build可以进行镜像的构建；通过docker tag用户可以对镜像的名称进行修改，加入镜像仓库的信息；通过docker pull命令将镜像仓库中下载到其主机上运行

#### 6.3.Kubernetes基础
- 1. Kubernetes是Google推出的一个开源容器编排平台，Kubernetes从与Docker Swarm和Mesosphere等编排工具的竞争中脱颖而出
- 2. 一个完整的Kubernetes架构是一个计算集群，其中包含若干台主机。这些主机中有两种角色：Master及Node
- 3. 在Master及Node上运行着不同种类的组件：Master、Node、API Server、Controller Manager、Scheduler、etcd、kubelet、kube-proxy、容器引擎
- 4. 命名空间的作用是进行资源的组织，它类似于文件系统中文件夹的作用，用来分隔不同的资源
- 5. Pod是Kubernetes中应用调度和扩展的基本单位；Service是Kubernetes中的一种资源对象；Deployment是Kubernetes描述容器部署信息的资源对象；ReplicaSet是Kubernetes中负责监控容器实例状态的资源对象，其保证实际运行的容器实例数量与用户定义的容器实例数量相符；Kubernetes可以与多种软件定义网络（SDN）方案集成，为集群中的容器提供一个虚拟网络；Ingress是Kubernetes将集群内部的服务对外发布的一种方式；Kubernetes提供了命令行工具kubectl及Web图形界面让用户与集群进行交互

#### 6.4.构建Kubernetes环境
- 1. kubectl create创建一个命名空间；kubectl run部署镜像；kubectl describe pod查看容器的详细信息状态；kubectl scale帮助用户对容器实例进行弹性扩展；

#### 6.5.Kubernetes实战

### 第7章 OpenWhisk
- 7.1.OpenWhik项目：1. OpenWhisk是一个开源的Serverless计算平台；2. 目前OpenWhisk项目在GitHub上有若干个子项目，不同的项目维护不同的系统模块
- 7.2.Hello Whisk：1. OpenWhisk是一个事件驱动的平台。各类事件源想平台发送事件信息。事件到达平台后会触发触发器。平台根据规则触发相应的动作，动作是用户定义的函数逻辑。若干个动作可以构成调用链。用户可以在各种动作中调用其他外部服务以完成最终的任务
- 7.3.逻辑架构：1. Namespace是OpenWhisk组织资源的方式；Package的用途也是组织各种资源对象，如Feed、Trigger、Rule和Action；Action是用户定义的函数；Feed代表事件源发送来的事件的流；Trigger可被看作是事件的管道；Rule是描述Trigger与Action对应关系的对象；
- 7.4.系统架构：1. 通过Namespace、Package、Feed、Trigger、Rule以及Action等对象，用户可以实现事件驱动的函数式Serverless应用；2. OpenWhisk的整个架构中包含如下几个核心组件：反向代理（Nginx）、Controller（Scale编写）、数据库（CouchDB）、Kafka（分布式消息队列）、Invoker（负责函数调用）、Docker、API Gateway
- 7.5.Kubernetes部署
- 7.6.Helm部署：1. Helm项目的目的就是为了简化Kubernetes上容器应用的部署和管理
- 7.7.蛋糕管理服务

### 第8章 Kubeless
- 8.1. 基于Kubernetes实现的一个Serverless框架
- 8.1.Kubeless项目：Function是用户定义的Serverless函数；Runtime是函数运行所需要的运行环境；Trigger为函数触发条件的定义
- 8.2.Kubeless概述： kubeless是为Kubernetes设计的框架，因此Kubeless的运行需要Kubernetes环境
- 8.3.Function：1. Function对象在kubeless中代表一个可被执行的函数
- 8.4.Trigger：1. Kubeless用户通过定义Trigger将事件源与函数进行关联。Kubeless默认支持四种类型的Trigger，即HTTP、Cronjob、Kafka以及NATS
- 8.6. Kubeless增强和Kubernetes的能力，使Kubernetes成为一个FaaS平台。Kubeless利用了Kubernetes的平台特性，通过Kubernetes的Deployment管理函数的配置，通过HPA对函数实例进行弹性扩展，通过ConfigMap为运行时注入函数代码

### 第9章 Fission
#### 9.1.Fission项目
- 1. Fission是基于Kubernetes的Serverless框架，增强了Kubernetes的能力，将函数和事件驱动的计算模式引入了Kubernetes平台
- 2. Fission为用户屏蔽了容器和容器平台底层的细节：Function代表用户定义的函数；Environment即用户定义的函数所运行的环境；Trigger定义触发函数的事件来源
- 3. Fission在Kubernetes平台上引入了pollmgr即Router等组件实现FaaS的事件驱动和按需执行等关键特性：poolmgr负责管理一个预先启动的容器资源池，以缩短函数冷启动所用的时间；Router负责访问函数的HTTP请求的分发，是外界调用函数的入口；Fission提供了命令行工具和Web控制台作为用户交互客户端

#### 9.2.部署Fission
- 1. 可以通过Helm将Fission部署到Kubernetes上
- 2. Fission的组件需要持久化卷的支持

#### 9.3.深入探讨Fission
- 1. 通过Kubernetes自定义资源的方式，Fission扩展了Kubernetes中的逻辑概念，使得通过原生Kubernetes API和命令就可以操作Fission对象
- 2. Fission的所有函数都将运行在容器环境中。Environment代表函数运行的容器环境
- 3. Function在Fission中代表函数的定义。用户通过Function对象定义和管理函数实例
- 4. Fission用户在定义函数时可以提供一个单一的函数源代码，也可以提供一个包含函数机器依赖的压缩包。Package的引入使得函数代码和Function实现了分离，一个Package可以被多个不同的Function所引用，使得函数的源代码有了更好的重用性。
- 5. Trigger定义了可以触发函数执行的事件源。目前，Fission默认支持三种类型的Trigger，HTTP Trigger、Time Trigger以及Message Queue Trigger

#### 9.4.执行环境
- 1. FaaS平台的一大特点是代码的按需加载以及执行
- 2. 在Fission中两种执行模式实现函数实例的按需创建，分别为Pool-based模式以及New Deploy模式

#### 9.5.Workflows
- 1. Fission Workflows定义了一套基于YAML的函数流程编排规范

### 第10章 OpenFaaS
- 10.1.OpenFaaS项目：1. OpenFaaS是来自Docker社区的一款Serverless框架。OpenFaaS利用Docker Swam和Kubernetes的容器编排能力为用户提供了一个FaaS计算平台；2. 在容器编排层，OpenFaaS同时支持Docker Swarm和Kubernetes。OpenFaaS支持通过CNCF的性能指标工具Prometheus来收集集群的性能指标，并实现监控告警
- 10.2.初识OpenFaaS
- 10.3.OpenFaaS函数：1. OpenFaaS将容器相关的技术细节开放给用户，当创建一个新的函数时，用户需要自行生成该函数的Docker镜像
- 10.4.Watchdog：1. Function Watchdog是OpenFaaS函数容器的入口程序，它运行在每一个OpenFaaS的函数容器实例中，负责函数的执行和输入输出；2. OpenFaaS的Function Watchdog的工作机制类似于传统的CGI，每处理一个请求都默认产生一个子进程
- 10.5.监控：1. OpenFaaS默认通过Prometheus收集函数在执行过程中的性能指标；2. Grafana是一款开源的监控软件，其特点是支持丰富和酷炫的图表展示，用户可以快速构建出一个信息丰富的监控和管理驾驶舱
- 10.6.弹性扩展：1. 在OpenFaaS中有两种弹性扩展机制。一种是基于Prometheus Alertmanager实现的，另一种依赖于Kubernetes的HPA
- 10.7.函数应用市场：1. 为了让用户可以方便的找到需要的Serverless函数应用，OpenFaaS推出了OpenFaaS Function Store
- 10.8. Kubeless和Fission倾向于隐藏容器的细节，让用户专注于代码。OpenFaaS则是向用户开放更多的容器的细节，这使得熟悉容器的用户感觉更加容易上手
- 10.9. Kubeless和Fission都是基于Kubernetes的Serverless框架，而OpenFaaS则源于Docker社区，最早以Docker Swarm为基础。OpenFaaS目前支持Docker Swarm和Kubernetes两种容器编排平台

### 第11章 Serverless的落地与展望
- 11.1.Serverless的落地
- 11.2.Serverless平台建设：1.公有云；2.私有云；3.混合云
- 11.3.Serverless应用架构转型：1.开发模式：开发调试、单元测试、持续集成、应用部署；2.设计原则：每一个函数专一的实现一个功能；函数处理请求不依赖于函数自身的状态；实例扩展不影响函数执行；通过抽象的接口访问外部资源；函数不依赖于具体平台的专有功能；函数与其依赖的服务均无服务器化；3.迁移和重构：Serverless函数应用、单体应用以及微服务在本质上都是运行在现代主流软件和硬件上的应用程序，他们的区别在于不同的颗粒度
- 11.4.Serverless的未来：1.建立行业规范；2.完善工具链；3.深入结合容器

### 写在后面
- pdf书籍、笔记思维导图、随书代码打包下载地址：暂无，后面补上
- 思维导图在线查看：[点击打开](/assets/attachment/fed-book/《深入浅出Serverless-技术原理与应用实践》_陈耿_202003.svg)
- 得到电子书地址：[点击阅读](https://www.dedao.cn/ebook/5kMLgX2vKGy7x5M8YRoDQbLgqkEeAw2ZazwBNn2r6ljVPO1mX9ad4JZpzZn1RbeE)