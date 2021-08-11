import { TimeoutAction } from "actions/generalActions/timeoutAction";
import { ActionContext } from "contexts/ActionContext";
import { TaskContext } from "contexts/TaskContext";

export class Task {
	public _task: TaskEntity;
	public id: string;
	constructor() {
		this._task = TaskContext.CreateAndAdd();
		this.id = this._task.id;
	}
	Wait(actionEntity: ActionEntity) {
		this.WaitAll(actionEntity);
	}
	/**
	 * 有一个执行成功就算成功，失败会立即阻断。
	 * @param  {ActionEntity[]} ...actionEntities
	 */
	WaitAny(...actionEntities: ActionEntity[]) {
		const actionIds = _.map(actionEntities, (entity) => entity.id);
		this._task.actionsGroups.push({
			waitType: "any",
			actionsIds: actionIds
		})
		TaskContext.Update(this._task);
	}
	/**
	 * 全部执行成功才算成功，失败会立即阻断。
	 * @param  {ActionEntity[]} ...actionEntities
	 */
	WaitAll(...actionEntities: ActionEntity[]) {
		const actionIds = _.map(actionEntities, (entity) => entity.id);
		this._task.actionsGroups.push({
			waitType: "all",
			actionsIds: actionIds
		})
		TaskContext.
		Update(this._task);
	}

	WaitWithTimeout(actionEntity: ActionEntity, lifetime: number) {
		this.WaitAll(actionEntity, Task.Timeout(lifetime));
	}

	WaitAnyWithTimeout(actionEntities: ActionEntity[], lifetime: number) {
		this.WaitAny(...actionEntities, Task.Timeout(lifetime));
	}

	WaitAllWithTimeout(actionEntities: ActionEntity[], lifetime: number) {
		this.WaitAll(...actionEntities, Task.Timeout(lifetime));
	}

	static Timeout(lifetime: number): ActionEntity {
		const timeoutAction = ActionContext.CreateAndAdd("", TimeoutAction.type, [lifetime]);
		return timeoutAction;
	}
}

