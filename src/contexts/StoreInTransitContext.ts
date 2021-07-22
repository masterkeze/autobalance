import { DatasetManager } from "../utils/DatasetManager";
import { ContextBase } from "./ContextBase";

interface StoreInTransit extends Entity {
	gameObjectId: string,
	taskId: string,
	direction: "in" | "out",
	resourceType: ResourceConstant,
	amount: number,
	createTick: number
}

export class StoreInTransitContext extends ContextBase {
	static route: string = "storeInTransit";
	public static Initialize() {
		DatasetManager.Create(this.route, [], [{
			// 查询储量必定使用，高频率，直接聚集索引
			clustered: true,
			indexName: "gameObjectId"
		}, {
			clustered: false,
			indexName: "taskId"
		}, {
			clustered: false,
			indexName: "createTick"
		}], false);
	}

	public static Get(id: string) {
		return DatasetManager.GetById<StoreInTransit>(this.route, id);
	}

	public static GetByGameObjectId(gameObjectId: string) {
		return DatasetManager.GetByProperty<StoreInTransit>(this.route, "gameObjectId", gameObjectId);
	}

	public static GetByTaskId(taskId: string) {
		return DatasetManager.GetByProperty<StoreInTransit>(this.route, "taskId", taskId);
	}

	public static Add(entity: StoreInTransit) {
		DatasetManager.Add(this.route, entity);
	}

	public static Remove(entity: StoreInTransit) {
		DatasetManager.Remove(this.route, entity);
	}

	public static Update(entity: StoreInTransit) {
		DatasetManager.Update(this.route, entity);
	}
}
