function KeepUpToDate(route: string, lifetime: number): Cache {
	if (!global.redis) global.redis = {};
	if (!global.redis[route]) {
		global.redis[route] = {
			created: Game.time,
			lifetime: lifetime,
			data: {}
		};
		return global.redis[route];
	} else {
		const cache = global.redis[route];
		if (cache.lifetime >= 0 && Game.time > cache.created + cache.lifetime) {
			// 重置数据
			cache.created = Game.time;
			cache.data = {};
		}
		return global.redis[route];
	}
}

/**
 * 挂载于global上的键值对缓存器，支持超时
 */
export class CacheManager {
	public static Get<T>(route: string, lifetime: number, key: string): T | undefined {
		const cache = KeepUpToDate(route, lifetime);
		return cache.data[key] as T;
	}
	public static Set<T>(route: string, lifetime: number, key: string, value: T) {
		const cache = KeepUpToDate(route, lifetime);
		cache.data[key] = value;
	}
}
