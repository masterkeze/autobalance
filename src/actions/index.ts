import { CreepActions } from "./creepActions";
import { GeneralActions } from "./generalActions";

export const AllActions = [...CreepActions, ...GeneralActions];
export const MountActions = function () {
	_.map(AllActions, (action) => action.mount());
}
