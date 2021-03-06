interface Entity {
	id: string
}

interface PosEntity {
	roomName: string
	x: number
	y: number
}

interface TaskEntity extends Entity {
	status: TaskStatus
	step: number
	actionsGroups: ActionGroup[]
}


// 资源锁

interface ResourceLockEntity extends Entity {
	objectId: string
	taskId: string
	direction: "in" | "out"
	resourceType: ResourceConstant
	amount: number
}


interface ActionEntity extends Entity {
	operatorId: string
	type: string
	parameters: any[]
}

interface TimeoutEntity extends Entity {
	created: number
}

interface MessageEntity extends Entity {
	consumerId: string
	producerId: string
	createTick: number
	state: "pending" | "running" | "complete" | "fail"
	data:any
}

interface ServiceEntity extends Entity {
	route: string
	roomName: string
	creepNames: string[]
	data:any
}
