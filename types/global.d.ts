/*
	Example types, expand on these or remove them and add your own.
	Note: Values, properties defined here do no fully *exist* by this type definiton alone.
				You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

	Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
	Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
*/

/**
 * 全局变量
 */
interface Memory {
	datasets: Datasets
}

interface CreepMemory {
	role: string;
	room: string;
	working: boolean;
}

interface Creep {
	reach(target: { pos: RoomPosition } | RoomPosition, range?:number): ActionStatus
	reachAsync(target: { pos: RoomPosition } | RoomPosition, range?: number): ActionEntity

	withdrawOnce(target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number): ActionStatus
	withdrawOnceAsync(target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number): ActionEntity
}

// Syntax for adding proprties to `global` (ex "global.log")
declare namespace NodeJS {
	interface Global {
		methods: {
			[method:string]:Function
		}
	}
}

/**
 * 数据持久存储
 */
interface Datasets {
	[route: string]: Dataset
}

interface Dataset {
	[index: string]: {
		clusterd: boolean,
		data: {
			[value: string]: any[]
		}
	}
}

// 索引配置
interface IndexConfig {
	clustered: boolean
	// 哪个属性建索引
	indexName: string
}

// 数据基类
interface Entity {
	id: string
}

interface Context {
	route: string,
	Initialize(): void
	Add(entity: Entity): void
	Remove(entity: Entity): void
	Update(entity: Entity): void
	Get(id: string): Entity | undefined
}

interface PosEntity {
	roomName: string
	x: number
	y: number
}

// 指令

type ActionStatus = "running" | "complete" | "fail"

interface ActionEntity extends Entity {
	operatorId: string
	type: string
	parameters: any[]
}


// 任务
type TaskStatus = "waiting" | "running" | "complete" | "fail"
interface Action {
	type:string
	// 将异步方法绑到prototype上
	mount(): void
	run(actionEntity:ActionEntity): ActionStatus
}

interface ActionGroup {
	waitType: "all" | "any"
	// action ids
	actionsIds: string[]
}

interface TaskEntity extends Entity {
	actionsGroups:ActionGroup[]
}
