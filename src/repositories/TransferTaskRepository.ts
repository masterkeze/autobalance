import { TaskHeadContext } from "contexts/TaskHeadContext";
import { TransferTaskDetailContext } from "contexts/TransferTaskDetailContext";

interface TransferTask extends Task {
	detail: TransferTaskDetail
}

// 只读，不能改
export class TransferTaskRepository {
	public static Create(from: { pos: RoomPosition, id: string }, to: { pos: RoomPosition, id: string }, resourceType: ResourceConstant, amount: number): TransferTask {
		let transferTaskDetail = TransferTaskDetailContext.Create(from, to, resourceType, amount);
		let { id, state, type, createTick, detailId } = TaskHeadContext.Create("transferTask", transferTaskDetail.id);
		let result: TransferTask = {
			id, state, type, createTick, detailId,
			detail: transferTaskDetail
		}
		return result;
	}

	public static Add(transferTask: TransferTask) {
		let { id, state, type, createTick, detailId } = transferTask;
		let taskHead = { id, state, type, createTick, detailId };
		TaskHeadContext.Add(taskHead);
		TransferTaskDetailContext.Add(transferTask.detail);
	}

	public static Remove(transferTask: TransferTask) {
		let { id, state, type, createTick, detailId } = transferTask;
		let taskHead = { id, state, type, createTick, detailId };
		TaskHeadContext.Remove(taskHead);
		TransferTaskDetailContext.Remove(transferTask.detail);
	}

	public static Get(id: string) {
		let taskHead = TaskHeadContext.Get(id);
		if (taskHead) {
			let { id, state, type, createTick, detailId } = taskHead;
			let transferTaskDetail = TransferTaskDetailContext.Get(detailId);
			if (transferTaskDetail) {
				let transferTask: TransferTask = {
					id, state, type, createTick, detailId,
					detail: transferTaskDetail
				}
				return transferTask;
			} else {
				TaskHeadContext.Remove(taskHead);
			}
		}
		return undefined;
	}

	public static RemoveById(id: string) {
		let transferTask = this.Get(id);
		if (transferTask) {
			this.Remove(transferTask);
		}
	}
}
