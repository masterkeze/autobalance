import { ReachAction } from "./ReachAction";
import { TrackAction } from "./TrackAction";
import { transferOnceAction } from "./TransferOnceAction";
import { WithdrawOnceAction } from "./WithdrawOnceAction";

export const CreepActions: Action[] = [ReachAction,WithdrawOnceAction,transferOnceAction,TrackAction];
