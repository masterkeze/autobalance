import { Task } from "utils/Task";

export function DistributeTask(creep: Creep, resourceType: ResourceConstant, fromStructure: Structure | Tombstone | Ruin, toStructures: Structure[], totalAmount?: number) {
	const task = new Task();
	task.Wait(creep.reachAsync(fromStructure));
	task.Wait(creep.withdrawOnceAsync(fromStructure, resourceType, totalAmount));
	_.map(toStructures, (toStructure) => {
		task.Wait(creep.reachAsync(toStructure));
		task.Wait(creep.transferOnceAsync(toStructure, resourceType));
	})
}


// function TimeOutTestTask(creep: Creep, pos: RoomPosition) {
// 	const task = new Task();
// 	const promise1 = creep.reachAsync(pos);
// 	const promise2 = TimeOutAction.TimeOut(1500);
// 	task.WaitAny(promise1, promise2);
// }
