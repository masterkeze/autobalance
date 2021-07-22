/*
	Example types, expand on these or remove them and add your own.
	Note: Values, properties defined here do no fully *exist* by this type definiton alone.
				You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

	Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
	Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
*/

type indexKey = number | string

interface Memory {
	storeManager: StoreManagerStorage
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


// StoreManager.ts
interface StoreManagerStorage {

}


// DatasetManager.ts
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

interface Entity {
	id: string
}

interface IndexConfig {
	clustered: boolean
	// 哪个属性建索引
	indexName: string
}
