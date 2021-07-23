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
// const test1 = TransferTaskContext.GetByFromRoomName("sim");
// const test2 = TransferTaskContext.GetByToRoomName("sim");

// Logger.info(JSON.stringify(test1), "GetByFromRoomName", test1.length.toString());
// Logger.info(JSON.stringify(test2), "GetByToRoomName", test2.length.toString());

// Logger.info(JSON.stringify(test1), "GetByFromRoomName", test1.length.toString());
// test1[0].amount = 5000;
// TransferTaskContext.Update(test1[0]);
// Logger.info(JSON.stringify(test1), "GetByFromRoomName", test1.length.toString());
// TransferTaskContext.Remove(test1[0]);
// const test2 = TransferTaskContext.GetByFromRoomName("sim");
// Logger.info(JSON.stringify(test2), "GetByFromRoomName", test2.length.toString());


const test3 = TransferTaskContext.GetByResourceType("energy");
Logger.info(JSON.stringify(test3), "GetByResourceType", test3.length.toString());

const test4 = TransferTaskContext.GetByFromId("ca8f177570fbfa331513371c");
Logger.info(JSON.stringify(test4), "GetByFromId", test4.length.toString());
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
