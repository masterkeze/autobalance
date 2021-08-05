import { CreepActions } from "./creepActions";

export const AllActions = [...CreepActions];
export const MountActions = function () {
	_.map(AllActions, (action) => action.mount());
}
