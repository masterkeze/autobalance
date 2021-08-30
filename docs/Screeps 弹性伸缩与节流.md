## 消息服务架构

![image-20210830142644101.png](https://upload-images.jianshu.io/upload_images/26257383-bae4be6b1070dc6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 数据存储

![image-20210830142343154.png](https://upload-images.jianshu.io/upload_images/26257383-5e39cf95a2f4548a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 数据例子

![image-20210830142422629.png](https://upload-images.jianshu.io/upload_images/26257383-1739eb602301380a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 弹性伸缩

假如你手头有一个计算量非常大的计算任务，你想要加快任务的完成进度，你有两种选择

1.  垂直缩放(Scaling up/Scaling down)，升级手头的计算机配置，加大内存，换ssd，换更好的cpu，gpu等等。在Screeps中，可以理解为使用更大的Creep，更高效的执行计划（从单creep挖运，改成挖运分离）

2.  水平缩放(Scaling out/Scaling in)，多买几台计算机，一起参与计算。在Screeps中，可以理解为生更多的爬。

### 基于不同条件伸缩划分的四种服务类型

![image-20210830142144967.png](https://upload-images.jianshu.io/upload_images/26257383-0ec4377b371ab080.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 基于消息水平缩放的服务

这类型的服务，可以通过控制爬的数量来控制产出。

1.  当处理消息的速度低于消息增加的速度时，向孵化服务发送消息，请求更多的爬。

2.  当处理消息的速度高于消息增加的速度时，即消息存储中经常为空，则不请求爬，或者释放一部分爬（回收，或者再分配）

### 基于配置水平缩放的服务

配置信息表示的是一种”理想状态“，这类型的服务致力于缩小”理想“和”现实“的差距。以建造为例：配置中设定了A位置有Storage，建造服务就会检查A位置上是否有Storage，如果没有，就在该位置建造Storage。

### 基于环境水平缩放的服务

和上一类服务类似，区别在于，这类服务的理想状况是”显而易见“的，不需要配置。以维修服务为例：当建筑的hits不满时，维修这些建筑。

### 垂直缩放

每个服务内部配置垂直缩放，例如：房间内能量采集服务，在RCL较低时，因为体型较小，可以多个Creep挖一个矿，且挖运一体；RCL提高后，替换单Creep挖，单Creep运；link建造之后，替换为单Creep挖，link运。

## 节流

![image-20210830143439171.png](https://upload-images.jianshu.io/upload_images/26257383-abf6dd50d1cc6acd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 实时优先级

优先级不存储在消息中，而是在消息处理服务从消息存储读取消息时，结合配置信息/环境实时计算出优先级，这样做的好处是，当紧急情况发生时，可以立刻做出反应，比如能量不足，爬死光了，或者突然遭遇了进攻，动态的优先级可以把最迫切的消息提到最高的优先级。

消息的优先级，可以随着等待时间的增加而增加，避免这些消息永远得不到处理。

### 全局过滤

水平缩放的前提是，总资源足够。但是在一些情况下，例如CPU紧缺，能量紧缺，开战，需要人为限制处理一些消息，这种时候优先级就不能解决问题了，因为如果消息存储中只有这条消息，他仍然会被处理。因此需要一个全局过滤器，当消息的处理服务从消息存储中读取消息时，过滤这部分消息。

可以通过两个维度来联合过滤消息：

1.  房间

2.  消息发布者

例如某房间开战时，其他房间的维修，建造服务都可以暂停，但是战斗房间的维修服务不能暂停，这里体现了房间维度过滤的必要性。采集服务可以全部暂停，这就体现了消息发布者维度过滤的必要性。两者结合，可以灵活处理各种突发事件。