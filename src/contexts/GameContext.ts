import { ContextBase } from "./ContextBase";

let _cache: {
	tick: number,
	myCreeps?: Creep[],
	myPowerCreeps?: PowerCreep[],
	mySpawns?: StructureSpawn[],
	myConstructionSites?: ConstructionSite[],
	rooms?: Room[],
	roomNames?: string[],
	myCreepsInRoom?: { [roomName: string]: Creep[] }
};

function KeepUpToDate() {
	if (!_cache || _cache.tick != Game.time) {
		_cache = { tick: Game.time };
	}
}

export class GameContext extends ContextBase {
	/**
	 * @returns Creep[]
	 */
	public static get myCreeps(): Creep[] {
		KeepUpToDate();
		if (!_cache.myCreeps) _cache.myCreeps = _.values<Creep>(Game.creeps);
		return _cache.myCreeps;
	}
	/**
	 * @returns PowerCreep[]
	 */
	public static get myPowerCreeps(): PowerCreep[] {
		KeepUpToDate();
		if (!_cache.myPowerCreeps) _cache.myPowerCreeps = _.values<PowerCreep>(Game.powerCreeps);
		return _cache.myPowerCreeps;
	}
	/**
	 * @returns StructureSpawn[]
	 */
	public static get mySpawns(): StructureSpawn[] {
		KeepUpToDate();
		if (!_cache.mySpawns) _cache.mySpawns = _.values<StructureSpawn>(Game.spawns);
		return _cache.mySpawns;
	}
	/**
	 * @returns ConstructionSite[]
	 */
	public static get myConstructionSites(): ConstructionSite[] {
		KeepUpToDate();
		if (!_cache.myConstructionSites) _cache.myConstructionSites = _.values<ConstructionSite>(Game.constructionSites);
		return _cache.myConstructionSites;
	}
	/**
	 * @returns Room[]
	 */
	public static get rooms(): Room[] {
		KeepUpToDate();
		if (!_cache.rooms) _cache.rooms = _.values<Room>(Game.rooms);
		return _cache.rooms;
	}
	/**
	 * @returns string[]
	 */
	public static get roomNames(): string[] {
		KeepUpToDate();
		if (!_cache.roomNames) _cache.roomNames = _.keys(Game.rooms);
		return _cache.roomNames;
	}
	/**
	 * @param  {string} roomName
	 * @returns Creep[]
	 */
	public static GetMyCreepsInRoom(roomName: string): Creep[] {
		if (!Game.rooms[roomName]) return [];
		KeepUpToDate();
		if (!_cache.myCreepsInRoom) {
			_cache.myCreepsInRoom = {};
			for (const room of this.rooms) {
				_cache.myCreepsInRoom[room.name] = room.find(FIND_MY_CREEPS);
			}
		}
		return _cache.myCreepsInRoom[roomName] ? _cache.myCreepsInRoom[roomName] : [];
	}
}
