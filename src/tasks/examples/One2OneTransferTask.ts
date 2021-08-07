import { Task } from "utils/Task";

export function One2OneTransferTask(creep: Creep, resourceType: ResourceConstant, fromStructure: Structure | Tombstone | Ruin, toStructure: Structure, amount?: number) {
	const task = new Task();
	task.Wait(creep.reachAsync(fromStructure));
	task.Wait(creep.withdrawOnceAsync(fromStructure, resourceType, amount));
	task.Wait(creep.reachAsync(toStructure));
	task.Wait(creep.transferOnceAsync(toStructure, resourceType, amount));
}


// export function One2OneTransferTask(creep: Creep, resourceType: ResourceConstant, fromStructure: Structure | Tombstone | Ruin, toStructure: Structure, amount?: number) {
// 	const task = new Task();
// 	task.LockCreep(creep);
// 	task.LockResources("out", fromStructure, amount);
// 	task.LockResources("in", toStructure, amount);
// 	task.Wait(creep.reachAsync(fromStructure));
// 	task.Wait(creep.withdrawOnceAsync(fromStructure, resourceType, amount));
// 	task.Wait(creep.reachAsync(toStructure));
// 	task.Wait(creep.transferOnceAsync(toStructure, resourceType, amount));
// 	// 不需要手动释放，任务完成/失败/中止时自动释放资源
// }
