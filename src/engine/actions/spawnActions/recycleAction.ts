import { ActionContext } from "data/contexts/ActionContext";
import { Logger } from "utils/Logger";

export const RecycleAction: Action = {
	type: "recycle",
	mount() {
		const _this = this;
		Spawn.prototype.recycle = function(target){
			if (!target || !this) return "fail";
			const reachRetCode = target.reach(this);
			if (reachRetCode == "complete") {
				const retCode = this.recycleCreep(target);
				if (retCode == OK) {
					return "complete";
				} else {
					Logger.ErrorCode(`RecycleAction:${this.name}.recycleCreep(${target.name}`, retCode);
					return "fail";
				}
			} else {
				return reachRetCode;
			}
		}
		Spawn.prototype.recycleAsync = function (target) {
			return ActionContext.CreateAndAdd(this.id, _this.type, [target.id]);
		}
	},
	run(recycleAction: ActionEntity) {
		const rawParas = recycleAction.parameters;
		const operatorId = recycleAction.operatorId;
		const spawn = Game.getObjectById<StructureSpawn>(operatorId);
		if (!spawn) {
			return "fail";
		}
		const targetId = rawParas[0];
		const target = Game.getObjectById<Creep>(targetId);
		if (!target) {
			return "complete";
		}
		const actionStatus = spawn.recycle(target);
		return actionStatus;
	}
}
