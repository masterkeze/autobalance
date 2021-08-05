import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

interface TaskContext extends Context {
	Add(entity: TaskEntity): void
	Remove(entity: TaskEntity): void
	Update(entity: TaskEntity): void
	Get(id: string): TaskEntity | undefined
	Create(): TaskEntity
	CreateAndAdd(): TaskEntity
}

export const TaskContext: TaskContext = {
	route: "task",
	Initialize() {
		DatasetManager.Create(this.route, [], [], true)
	},
	Add(task: TaskEntity) {
		DatasetManager.Add(this.route, task);
	},
	Remove(task: TaskEntity) {
		DatasetManager.Remove(this.route, task);
	},
	Update(task: TaskEntity) {
		DatasetManager.Update(this.route, task);
	},
	Get(id: string) {
		return DatasetManager.GetById<TaskEntity>(this.route, id);
	},
	Create() {
		return { id: UniqueId.Get(), actionsGroups: [] };
	},
	CreateAndAdd() {
		const task = { id: UniqueId.Get(), actionsGroups: [] };
		this.Add(task);
		return task;
	}
}
