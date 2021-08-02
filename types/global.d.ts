/*
	Example types, expand on these or remove them and add your own.
	Note: Values, properties defined here do no fully *exist* by this type definiton alone.
				You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

	Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
	Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
*/

type TaskTypeConstant = "transferTask" | "distributeTask" | "harvestTask"
type TaskStateConstant = "pending" | "running" | "complete" | "aborted"

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

// Syntax for adding proprties to `global` (ex "global.log")
declare namespace NodeJS {
	interface Global {
		log: any;
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
	route:string,
	Initialize(): void
	Add(entity: Entity): void
	Remove(entity: Entity): void
	Update(entity: Entity): void
	Get(id: string): Entity|undefined
}
