import { DatasetManager } from "../utils/DatasetManager";
import { ContextBase } from "./ContextBase";

interface TaskHead extends Entity {
	// 明细表单的主键
	detailId: string
	state: TaskStateConstant
	type: TaskTypeConstant
	createTick: number
}

export class TaskHeadContext extends ContextBase {
	static route: string = "taskHead";
	public static Initialize() {
		DatasetManager.Create(this.route, [], [{
			clustered: false,
			indexName: "state"
		}, {
			clustered: false,
			indexName: "type"
		}], false);
	}

	public static Get(id: string) {
		return DatasetManager.GetById<TaskHead>(this.route, id);
	}

	public static Add(entity: TaskHead) {
		DatasetManager.Add(this.route, entity);
	}

	public static Remove(entity: TaskHead) {
		DatasetManager.Remove(this.route, entity);
	}

	public static Update(entity: TaskHead) {
		DatasetManager.Update(this.route, entity);
	}

	public static Create(type: TaskTypeConstant, detailId: string) {
		let result: TaskHead = {
			id: _.uniqueId(Game.time.toString()),
			detailId: detailId,
			state: "pending",
			type: type,
			createTick: Game.time
		}
		return result;
	}

	public static GetByState(state: TaskStateConstant) {
		return DatasetManager.GetByProperty<TaskHead>(this.route, "state", state);
	}
}
