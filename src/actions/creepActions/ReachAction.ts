import { ActionContext } from "contexts.ts/ActionContext";
import { Convert } from "utils/Convert";

export const ReachAction: Action = {
	type:"reach",
	mount() {
		const _this = this;
		Creep.prototype.reach = function (target, range = 1) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) > range) {
				this.moveTo(target);
				return "running";
			} else {
				return "complete";
			}
		};
		Creep.prototype.reachAsync = function (target, range = 1) {
			const posEntity = Convert.ToPosEntity(target);
			const reachAction = ActionContext.CreateAndAdd(this.id, _this.type, [posEntity, range]);
			return reachAction;
		};
	},
	run(reachAction: ActionEntity) {
		const rawParas = reachAction.parameters;
		const operatorId = reachAction.operatorId;
		const creep = Game.getObjectById<Creep>(operatorId);
		if (!creep) {
			ActionContext.Remove(reachAction);
			return "fail";
		}
		const posEntity:PosEntity = rawParas[0];
		const range:number = rawParas[1];
		const pos = new RoomPosition(posEntity.x, posEntity.y, posEntity.roomName);
		const actionStatus = creep.reach(pos, range);
		if (actionStatus == "complete" || actionStatus == "fail") {
			ActionContext.Remove(reachAction);
		}
		return actionStatus;
	}
}
