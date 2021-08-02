import { Logger } from "services/Logger";


function EnsureCreated(route: string): boolean {
	if (!Memory.datasets) Memory.datasets = {};
	if (!Memory.datasets[route]) {
		Memory.datasets[route] = {};
		return false;
	} else {
		return true;
	}
}

export class DatasetManager {
	/**
	 * 在Memory中创建数据集
	 * @param  {string} route 路径
	 * @param  {Entity[]} entities 数据
	 * @param  {IndexConfig[]} indexConfigs? 索引结构
	 * @param  {boolean} reset? 是否清空重建
	 */
	public static Create(route: string, entities: Entity[], indexConfigs?: IndexConfig[], reset?: boolean) {
		let created = EnsureCreated(route);
		if (!created || reset) {
			// 主键默认聚集索引
			Memory.datasets[route]["id"] = {
				clusterd: true,
				data: {}
			};
			if (indexConfigs) {
				for (const indexConfig of indexConfigs) {
					Memory.datasets[route][indexConfig.indexName] = {
						clusterd: indexConfig.clustered,
						data: {}
					};
				}
			}
			Logger.Info("DatasetManager.Create",`Dataset:${route} created.`);
		} else {
			if (indexConfigs) {
				let currentIndexes = Object.keys(Memory.datasets[route]);
				let newIndexConfigs = indexConfigs.filter(config => !currentIndexes.includes(config.indexName));
				if (newIndexConfigs.length > 0) {
					const entities = _.flattenDeep(Object.values(Memory.datasets[route]["id"].data));
					for (const indexConfig of newIndexConfigs) {
						Memory.datasets[route][indexConfig.indexName] = {
							clusterd: indexConfig.clustered,
							data: {}
						};
					}
					for (const entity of entities) {
						for (const indexConfig of newIndexConfigs) {
							const indexName = indexConfig.indexName;
							const value = (entity as any)[indexName];
							if (value == undefined) {
								continue;
							}
							const index = Memory.datasets[route][indexName];
							if (index.clusterd) {
								// 聚集索引全量存储
								if (index.data[value]) {
									index.data[value].push(entity);
								} else {
									index.data[value] = [entity];
								}
							} else {
								// 非聚集只存储主键列
								if (index.data[value]) {
									index.data[value].push(entity.id);
								} else {
									index.data[value] = [entity.id];
								}
							}
						}
					}
				}
			}
		}
		// 插入数据
		for (const entity of entities) {
			this.Add(route, entity);
		}
	}
	/**
	 * 向数据集添加数据
	 * @param  {string} route
	 * @param  {Entity} entity
	 */
	public static Add(route: string, entity: Entity) {
		let created = EnsureCreated(route);
		if (!created) {
			Logger.Error("DatasetManager.Add",`Adding ${JSON.stringify(entity)} to a non-existing dataset:${route}`);
			return;
		}
		const indexNames = Object.keys(Memory.datasets[route]);
		for (const indexName of indexNames) {
			const value = (entity as any)[indexName];
			if (value == undefined) {
				continue;
			}
			const index = Memory.datasets[route][indexName];
			if (index.clusterd) {
				// 聚集索引全量存储
				if (index.data[value]) {
					index.data[value].push(entity);
				} else {
					index.data[value] = [entity];
				}
			} else {
				// 非聚集只存储主键列
				if (index.data[value]) {
					index.data[value].push(entity.id);
				} else {
					index.data[value] = [entity.id];
				}
			}
		}
	}

	public static Remove(route: string, entity: Entity) {
		let created = EnsureCreated(route);
		if (!created) {
			Logger.Error("DatasetManager.Remove", `Removing ${JSON.stringify(entity)} from a non-existing dataset:${route}`);
			return;
		}
		const indexNames = Object.keys(Memory.datasets[route]);
		for (const indexName of indexNames) {
			const value = (entity as any)[indexName];
			const index = Memory.datasets[route][indexName];
			// 空值或者数据不存在
			if (!value || !index.data[value]) {
				continue;
			}
			if (indexName == "id") {
				// 主键直接删除记录
				delete index.data[value];
			} else {
				//index.data[value] = _.filter(index.data[value],(id)=>{id != entity.id})
				_.remove(index.data[value], (x) => (x == entity.id));
				if (index.data[value].length == 0) delete index.data[value];
			}

		}
	}

	public static Update(route: string, entity: Entity) {
		let created = EnsureCreated(route);
		if (!created) {
			Logger.Error("DatasetManager.Update",`Updating ${JSON.stringify(entity)} from a non-existing dataset:${route}`);
			return;
		}
		const indexNames = Object.keys(Memory.datasets[route]);
		for (const indexName of indexNames) {
			const value = (entity as any)[indexName];
			const index = Memory.datasets[route][indexName];
			// 空值或者数据不存在
			if (!value || !index.data[value]) {
				continue;
			}
			// 只更新聚集索引
			if (!index.clusterd) {
				continue;
			}
			if (indexName == "id") {
				index.data[value] = [entity]
			} else {
				index.data[value] = _.remove(index.data[value], (x) => (x.id == entity.id));
				index.data[value].push(entity);
			}
		}
	}
	public static GetById<T>(route: string, id: string): T | undefined {
		EnsureCreated(route);
		if (Memory.datasets[route]["id"]) {
			let result = Memory.datasets[route]["id"].data[id];
			return result[0] as T;
		}
		return undefined;
	}
	public static GetByProperty<T>(route: string, property: string, value: any): T[] {
		EnsureCreated(route);
		const index = Memory.datasets[route][property];
		if (index) {
			let result = Memory.datasets[route][property].data[value];
			if (!result) return [];
			// 聚集的直接返回
			if (index.clusterd) {
				return result as T[];
			} else {
				let lookup = [];
				// 非聚集联查id索引
				for (const id of result as string[]) {
					let entity = Memory.datasets[route]["id"].data[id][0];
					lookup.push(entity);
				}
				return lookup as T[];
			}
		} else {
			if (Memory.datasets[route]["id"]) {
				let data = _.flattenDeep(Object.values(Memory.datasets[route]["id"].data));
				return data.filter(e => e[property] == value) as T[];
			} else {
				return [] as T[];
			}
		}
	}
	public static GetByProperties<T>(route: string, pairs: { property: string, value: any }[]): T[] {
		// 多条件联查，贼复杂，先不整了。
		EnsureCreated(route);
		if (pairs.length == 0) return [] as T[];
		if (Memory.datasets[route]["id"]) {
			let result = this.GetByProperty<T>(route, pairs[0].property, pairs[1].property) as any[];
			for (let i = 1; i < pairs.length; i++) {
				const pair = pairs[i];
				result = result.filter((e) => e[pair.property] == pair.value);
			}
			return result as T[];
			// let data = _.flattenDeep(Object.values(Memory.datasets[route]["id"].data));
			// return data.filter(e => {
			// 	for (const pair of pairs) {
			// 		let property = pair.property;
			// 		let value = pair.value;
			// 		if (e[property] != value) {
			// 			return false;
			// 		}
			// 	}
			// 	return true;
			// }) as T[];
		} else {
			return [] as T[];
		}
		/*
		const indices = [];
		let indexExists = true;
		for (const pair of pairs) {
			let property = pair.property;
			let value = pair.value;
			const index = Memory.datasets[route][property];
			if (!index) {
				indexExists = false;
				break;
			} else {
				indices.push(index);
			}
		}
		if (indexExists) {
			let result = Memory.datasets[route][property].data[value];
			if (!result) return [];
			// 聚集的直接返回
			if (index.clusterd) {
				return result as T[];
			} else {
				let lookup = [];
				// 非聚集联查id索引
				for (const id of result as string[]) {
					let entity = Memory.datasets[route]["id"].data[id][0];
					lookup.push(entity);
				}
				return lookup as T[];
			}
		} else {

		}
		*/
	}
}
