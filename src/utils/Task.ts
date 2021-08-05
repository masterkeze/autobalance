import { TaskContext } from "contexts/TaskContext";

export class Task {
	private _task: TaskEntity;

	constructor() {
		this._task = TaskContext.CreateAndAdd();
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
	 * @param actionEntities
	 */
	WaitAll(...actionEntities: ActionEntity[]) {
		const actionIds = _.map(actionEntities, (entity) => entity.id);
		this._task.actionsGroups.push({
			waitType: "all",
			actionsIds: actionIds
		})
		TaskContext.Update(this._task);
	}
}

