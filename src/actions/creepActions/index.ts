import { ReachAction } from "./ReachAction";

export const CreepActions: Action[] = [ReachAction];

export const MountCreepActions = function() {
	_.map(CreepActions, (action) => action.mount());
}
