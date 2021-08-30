import { CacheManager } from "data/CacheManager";

export class RoomCache {
	static route = 'room';
	static lifetime = 0;
	public static GetSpawns(room: Room): StructureSpawn[] {
		const key = `spawn_${room.name}`;
		const spawns = CacheManager.Get<StructureSpawn[]>(this.route, this.lifetime, key);
		if (!spawns) {
			const cache = room.find(FIND_MY_STRUCTURES).filter((structure) => structure.structureType == STRUCTURE_SPAWN) as StructureSpawn[];
			CacheManager.Set<StructureSpawn[]>(this.route, this.lifetime, key, cache);
			return cache;
		} else {
			return spawns;
		}
	}
}
