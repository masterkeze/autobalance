import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";
import { ActionContext } from "./ActionContext";
import { ResourceLockContext } from "./ResourceLockEntity";

interface TaskContext extends Context {
	Add(entity: TaskEntity): void
	Remove(entity: TaskEntity): void
	Update(entity: TaskEntity): void
	Get(id: string): TaskEntity | undefined
	Create(): TaskEntity
	CreateAndAdd(): TaskEntity
	GetTasksByStatus(status: TaskStatus): TaskEntity[]
}

export const TaskContext: TaskContext = {
	route: "task",
	Initialize() {
		DatasetManager.Create(this.route, [], [], false);
	},
	Add(task: TaskEntity) {
		DatasetManager.Add(this.route, task);
	},
	Remove(task: TaskEntity) {
		task.actionsGroups.forEach((group) => {
			ActionContext.RemoveByIds(group.actionsIds);
		})
		ResourceLockContext.RemoveByTaskId(task.id);
		DatasetManager.Remove(this.route, task);
	},
	Update(task: TaskEntity) {
		DatasetManager.Update(this.route, task);
	},
	Get(id: string) {
		return DatasetManager.GetById<TaskEntity>(this.route, id);
	},
	Create() {
		return { id: UniqueId.Get(), step: 0, status: "running", actionsGroups: [] };
	},
	CreateAndAdd() {
		const task = { id: UniqueId.Get(), step: 0, status: "running" as TaskStatus, actionsGroups: [] };
		this.Add(task);
		return task;
	},
	GetTasksByStatus(status:TaskStatus) {
		return DatasetManager.GetByProperty<TaskEntity>(this.route, "status", status);
	}
}
