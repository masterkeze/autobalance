import { GameContext } from "./GameContext";
import { StoreInTransitContext } from "./StoreInTransitContext";
import { TaskHeadContext } from "./TaskHeadContext";
import { TransferTaskDetailContext } from "./TransferTaskDetailContext";

export class ContextManager {
	public static RegisterAllContexts() {
		// Game
		GameContext.Initialize();
		// Task
		TaskHeadContext.Initialize();
		TransferTaskDetailContext.Initialize();

		StoreInTransitContext.Initialize();
	}
}
