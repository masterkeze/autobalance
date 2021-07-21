import Context from "utils/Context";
import { ErrorMapper } from "utils/ErrorMapper";
import Logger from "utils/Logger";

Context.Initialize();
Logger.info(Context.roomNames.join(","));
const mySpawns = Context.mySpawns;
if (mySpawns.length >= 2) {
	Context.AddTransferTask(Context.CreateTransferTask(mySpawns[0], mySpawns[1], "energy", 100));
	Context.AddTransferTask(Context.CreateTransferTask(mySpawns[1], mySpawns[0], "energy", 200));
}
Logger.info(JSON.stringify(Context.GetTransferTasksFromRoom("sim")));
Logger.info(JSON.stringify(Context.GetTransferTasksToRoom("sim")));


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`);

	// Automatically delete memory of missing creeps
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}

});
