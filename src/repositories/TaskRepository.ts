import { StoreInTransitContext } from "contexts/StoreInTransitContext";
import { TaskHeadContext } from "contexts/TaskHeadContext";
import { Logger } from "utils/Logger";
import { TransferTaskRepository } from "./TransferTaskRepository";

export class TaskRepository {
	// 同时删除 StoreInTransit 相关内容
	public static RemoveCompleteOrAbortedTasks() {
		let completeTasks = TaskHeadContext.GetByState("complete");
		let abortedTasks = TaskHeadContext.GetByState("aborted");
		let tasksToRemove = completeTasks.concat(abortedTasks);
		for (const task of tasksToRemove) {
			let storeInTransits = StoreInTransitContext.GetByTaskId(task.id);
			for (const storeInTransit of storeInTransits) {
				StoreInTransitContext.Remove(storeInTransit);
			}
			switch (task.type) {
				case "transferTask":
					TransferTaskRepository.RemoveById(task.id);
					break;

				default:
					Logger.error(`Failed to remove tasks. Invalid task type:[${task.type}]`, "TaskRepository", "RemoveCompleteOrAbortedTasks");
					break;
			}
		}
	}
}
