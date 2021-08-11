import { ErrorMapper } from "utils/ErrorMapper";
import { MountAll } from "utils/Mount";
import { SpiralMoveTask } from "tasks/examples/SpiralMoveTask";
import { TaskRunner } from "utils/TaskRunner";
import { One2OneTransferTask } from "tasks/examples/One2OneTransferTask";
import { DistributeTask } from "tasks/examples/DistributeTask";
import { CreepIntentsCache } from "cache/CreepIntentsCache";
import { Task } from "utils/Task";
import { ResourceLock } from "utils/ResourceLock";
import { VisualHelper } from "utils/VisualHelper";

console.log("script reloaded!")
MountAll();

function testTimeOut(creep:Creep) {
	const task = new Task();
	task.WaitWithTimeout(creep.reachAsync(new RoomPosition(48, 48, "sim")), 5);
	console.log(task._task.id);
}


global.testFunc = function () {
	const room = Game.rooms["sim"];
	const storage = room.storage;
	if (storage) {
		const task = new Task();
		task.Wait(ResourceLock.LockAsync(storage, task.id, "in", RESOURCE_LEMERGIUM, 500));
		task.Wait(ResourceLock.LockAsync(storage, task.id, "out", RESOURCE_LEMERGIUM, 3333));
	}

	// const creep1 = Game.creeps.A;
	// const creep2 = Game.creeps.B;
	// const creep3 = Game.creeps.C;
	// const creep4 = Game.creeps.D;
	// if (creep1 && creep2 && creep3 && creep4) {
	// 	SpiralMoveTask(new RoomPosition(15,15,"sim"),14,creep1,creep2,creep3,creep4);
	// }
	// const creep = Object.values(Game.creeps)[0];
	// testTimeOut(creep);
	// const storage = room.storage;
	// const extensions = room.find(FIND_STRUCTURES).filter((structure) => { return structure.structureType == STRUCTURE_EXTENSION && structure.store.energy == 0 });
	// if (creep && storage && extensions && extensions.length > 0) {
	// 	DistributeTask(creep, "energy", storage, extensions);
	// 	console.log("new task created!");
	// }
	// const pos1 = new RoomPosition(15, 15, "sim");
	// const pos2 = new RoomPosition(15, 35, "sim");
	// const pos3 = new RoomPosition(35, 35, "sim");
	// const pos4 = new RoomPosition(35, 15, "sim");
	// const spiralTask = SpiralMoveTask(creep, pos1, pos2, pos3, pos4);
	// console.log(spiralTask.id);
}


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	MountAll();
	//TaskRunner.RemoveCompleteTasks();
	TaskRunner.RemoveFailedTasks();
	TaskRunner.RemovetimeoutTasks();
	console.log(`Current game tick is ${Game.time}`);
	const room = Game.rooms["sim"];
	const storage = room.storage;
	if (storage) VisualHelper.DrawResourceLocks(storage);
	TaskRunner.RunAll();
	// Automatically delete memory of missing creeps
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}
});
