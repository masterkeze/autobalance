import { TaskContext } from "contexts/TaskContext";
import { ActionRunner } from "./ActionRunner";

export class TaskRunner {
	static Run(taskEntity: TaskEntity): TaskStatus {
		const actionGroup = taskEntity.actionsGroups.shift();
		TaskContext.Update(taskEntity);
		if (actionGroup) {
			// 执行所有Action
			const waitType = actionGroup.waitType;
			const results = ActionRunner.RunByIds(actionGroup.actionsIds);
			if (results.length > 0) {
				// 一个失败，全部视为失败
				if (results.includes("fail")) {
					return "fail";
				}
				if (waitType == "all") {
					// 有执行中的，继续执行
					if (results.includes("running")) {
						return "running";
					}
				} else if (waitType == "any") {
					// 没有完成的，继续执行
					if (!results.includes("complete")) {
						return "running";
					}
				}

			}
		}
		if (taskEntity.actionsGroups.length > 0) {
			return "running";
		} else {
			return "complete";
		}
	}
}
