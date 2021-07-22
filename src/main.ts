import { ContextRegistry } from "contexts/ContextRegistry";
import {GameContext} from "contexts/GameContext";
import { TransferTaskContext } from "contexts/TransferTaskContext";
import { ErrorMapper } from "utils/ErrorMapper";
import {Logger} from "utils/Logger";

ContextRegistry.Register();
Logger.info(GameContext.roomNames.join(","));
const mySpawns = GameContext.mySpawns;
if (mySpawns.length >= 2) {
	TransferTaskContext.Add(TransferTaskContext.Create(mySpawns[0], mySpawns[1], "energy", 100));
	TransferTaskContext.Add(TransferTaskContext.Create(mySpawns[1], mySpawns[0], "energy", 200));
}
Logger.info(JSON.stringify(TransferTaskContext.GetByFromRoomName("sim")));
Logger.info(JSON.stringify(TransferTaskContext.GetByToRoomName("sim")));


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
