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
	track(target: { pos: RoomPosition, id:string }, range?: number): ActionStatus
	trackAsync(target: { pos: RoomPosition, id: string }, range?: number): ActionEntity
	withdrawOnce(target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number): ActionStatus
	withdrawOnceAsync(target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number): ActionEntity
	transferOnce(target: AnyCreep | Structure, resourceType: ResourceConstant, amount?: number): ActionStatus
	transferOnceAsync(target: AnyCreep | Structure, resourceType: ResourceConstant, amount?: number): ActionEntity
}

// Syntax for adding proprties to `global` (ex "global.log")
declare namespace NodeJS {
	interface Global {
		mounted: boolean
		redis: Redis
		testFunc():void
	}
}


