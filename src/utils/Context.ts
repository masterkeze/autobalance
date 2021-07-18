let _cache: {
	tick: number,
	myCreeps?: Creep[],
	myPowerCreeps?: PowerCreep[],
	mySpawns?: StructureSpawn[],
	myConstructionSites?: ConstructionSite[],
	rooms?: Room[],
	roomNames?: string[],
	myCreepsInRoom?:{[roomName:string]:Creep[]}
};

function keepUpToDate() {
	if (!_cache || _cache.tick != Game.time) {
		_cache = { tick: Game.time };
	}
}

export default class Context {
	/**
	 * @returns Creep[]
	 */
	public static get myCreeps(): Creep[] {
		keepUpToDate();
		if (!_cache.myCreeps) _cache.myCreeps = _.values<Creep>(Game.creeps);
		return _cache.myCreeps;
	}
	/**
	 * @returns PowerCreep[]
	 */
	public static get myPowerCreeps(): PowerCreep[] {
		keepUpToDate();
		if (!_cache.myPowerCreeps) _cache.myPowerCreeps = _.values<PowerCreep>(Game.powerCreeps);
		return _cache.myPowerCreeps;
	}
	/**
	 * @returns StructureSpawn[]
	 */
	public static get mySpawns(): StructureSpawn[] {
		keepUpToDate();
		if (!_cache.mySpawns) _cache.mySpawns = _.values<StructureSpawn>(Game.spawns);
		return _cache.mySpawns;
	}
	/**
	 * @returns ConstructionSite[]
	 */
	public static get myConstructionSites(): ConstructionSite[] {
		keepUpToDate();
		if (!_cache.myConstructionSites) _cache.myConstructionSites = _.values<ConstructionSite>(Game.constructionSites);
		return _cache.myConstructionSites;
	}
	/**
	 * @returns Room[]
	 */
	public static get rooms(): Room[] {
		keepUpToDate();
		if (!_cache.rooms) _cache.rooms = _.values<Room>(Game.rooms);
		return _cache.rooms;
	}
	/**
	 * @returns string[]
	 */
	public static get roomNames(): string[] {
		keepUpToDate();
		if (!_cache.roomNames) _cache.roomNames = _.keys(Game.rooms);
		return _cache.roomNames;
	}
	/**
	 * @param  {string} roomName
	 * @returns Creep[]
	 */
	public static myCreepsInRoom(roomName: string): Creep[] {
		if (!Game.rooms[roomName]) return [];
		keepUpToDate();
		if (!_cache.myCreepsInRoom) {
			_cache.myCreepsInRoom = {};
			for (const room of this.rooms) {
				_cache.myCreepsInRoom[room.name] = room.find(FIND_MY_CREEPS);
			}
		}
		return _cache.myCreepsInRoom[roomName] ? _cache.myCreepsInRoom[roomName] : [];
	}
}
