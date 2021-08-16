interface Context {
	route: string,
	Initialize(): void
	Add(entity: Entity): void
	Remove(entity: Entity): void
	Update(entity: Entity): void
	Get(id: string): Entity | undefined
}

interface ActionContext extends Context {
	Add(entity: ActionEntity): void
	Remove(entity: ActionEntity): void
	Update(entity: ActionEntity): void
	Get(id: string): ActionEntity | undefined
	Create(operatorId: string, type: string, parameters: any[]): ActionEntity
	CreateAndAdd(operatorId: string, type: string, parameters: any[]): ActionEntity
	RemoveById(id: string): void
	RemoveByIds(ids: string[]): void
}

interface TaskContext extends Context {
	Add(entity: TaskEntity): void
	Remove(entity: TaskEntity): void
	Update(entity: TaskEntity): void
	Get(id: string): TaskEntity | undefined
	Create(): TaskEntity
	CreateAndAdd(): TaskEntity
	GetTasksByStatus(status: TaskStatus): TaskEntity[]
}


interface ResourceLockContext extends Context {
	Add(entity: ResourceLockEntity): void
	Remove(entity: ResourceLockEntity): void
	Update(entity: ResourceLockEntity): void
	Get(id: string): ResourceLockEntity | undefined
	Create(objectId: string, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number): ResourceLockEntity
	CreateAndAdd(objectId: string, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number): ResourceLockEntity
	GetResourceLocksByTaskId(taskId: string): ResourceLockEntity[]
	GetResourceLocksByObjectId(objectId: string): ResourceLockEntity[]
	RemoveByTaskId(taskId: string): void
}

interface TimeoutContext extends Context {
	Add(entity: TimeoutEntity): void
	Remove(entity: TimeoutEntity): void
	Update(entity: TimeoutEntity): void
	Get(id: string): TimeoutEntity | undefined
	Create(): TimeoutEntity
	CreateAndAdd(): TimeoutEntity
}

interface MessageContext extends Context {
	Add(entity: MessageEntity): void
	Remove(entity: MessageEntity): void
	Update(entity: MessageEntity): void
	Get(id: string): MessageEntity | undefined
	Create(route: string, roomName: string, producer: string, data: any): MessageEntity
	CreateAndAdd(route: string, roomName: string, producer: string, data: any): MessageEntity
	GetByRoute(route: string): MessageEntity[]
	GetByProducer(producer: string):MessageEntity[]
}
