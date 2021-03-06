import { TaskContext } from "data/contexts/TaskContext";
import { Logger } from "utils/Logger";
import { ActionRunner } from "./ActionRunner";
import { Task } from "./Task";
export class TaskRunner {
	static Run(taskEntity: TaskEntity): TaskStatus {
		const currentStep = taskEntity.step;
		const actionGroups = taskEntity.actionsGroups;
		const actionGroup = actionGroups[currentStep];
		if (!actionGroup) {
			taskEntity.status = "complete";
			TaskContext.Update(taskEntity);
			return "complete";
		}
		const waitType = actionGroup.waitType;
		const results = ActionRunner.RunByIds(actionGroup.actionsIds);
		if (results.length > 0) {
			// 一个失败，全部视为失败
			if (results.includes("fail")) {
				taskEntity.status = "fail";
				TaskContext.Update(taskEntity);
				return "fail";
			}
			// 超时，整体失败
			if (results.includes("timeout")) {
				taskEntity.status = "timeout";
				TaskContext.Update(taskEntity);
				return "timeout";
			}
			if (waitType == "all") {
				// 有执行中的，继续执行
				if (results.includes("running")) {
					taskEntity.status = "running";
					TaskContext.Update(taskEntity);
					return "running";
				}
			} else if (waitType == "any") {
				// 都没有完成，继续执行
				if (!results.includes("complete")) {
					taskEntity.status = "complete";
					TaskContext.Update(taskEntity);
					return "running";
				}
			}
		}
		// 当前步骤完成，执行下一步骤
		taskEntity.step += 1;
		TaskContext.Update(taskEntity);
		return this.Run(taskEntity);
	}
	static RunAll(): void{
		const runningTasks = TaskContext.GetTasksByStatus("running");
		_.map(runningTasks, (task) => { this.Run(task) });
	}

	static RemoveCompleteTasks(): void{
		const completeTasks = TaskContext.GetTasksByStatus("complete");
		if (completeTasks.length > 0) {
			Logger.Info("TaskRunner.RemoveCompleteTasks", `Removing ${completeTasks.length} complete tasks.`)
			_.map(completeTasks, (task) => { TaskContext.Remove(task) });
		}

	}

	static RemoveFailedTasks(): void {
		const failedTasks = TaskContext.GetTasksByStatus("fail");
		if (failedTasks.length > 0) {
			Logger.Info("TaskRunner.RemoveFailedTasks", `Removing ${failedTasks.length} failed tasks.`)
			_.map(failedTasks, (task) => { TaskContext.Remove(task) });
		}
	}

	static RemovetimeoutTasks(): void {
		const timeoutTasks = TaskContext.GetTasksByStatus("timeout");
		if (timeoutTasks.length > 0) {
			Logger.Info("TaskRunner.RemovetimeoutTasks", `Removing ${timeoutTasks.length} timeout tasks.`)
			_.map(timeoutTasks, (task) => { TaskContext.Remove(task) });
		}
	}
}
