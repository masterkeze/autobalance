// 指令
type ActionStatus = "running" | "complete" | "fail" | "timeout" | "intime"

// 任务
type TaskStatus = "running" | "complete" | "fail" | "timeout"
interface Action {
	type: string
	// 将同步方法，异步方法挂载到prototype上
	mount?(): void
	// 执行给定的指令
	run(actionEntity: ActionEntity): ActionStatus
}

interface ActionGroup {
	waitType: "all" | "any"
	// action ids
	actionsIds: string[]
}
