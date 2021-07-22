import { GameContext } from "./GameContext";
import { StoreInTransitContext } from "./StoreInTransitContext";
import { TransferTaskContext } from "./TransferTaskContext";

export class ContextRegistry {
	public static Register() {
		GameContext.Initialize();
		TransferTaskContext.Initialize();
		StoreInTransitContext.Initialize();
	}
}
