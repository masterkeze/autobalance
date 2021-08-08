import { fail } from "assert";
import { CreepIntentsCache } from "cache/CreepIntentsCache";
import { ActionContext } from "contexts/ActionContext";
import { Logger } from "services/Logger";
import { Convert } from "utils/Convert";

export const ReachAction: Action = {
	type:"reach",
	mount() {
		const _this = this;
		Creep.prototype.reach = function (target, range = 1) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) > range) {
				new RoomVisual("sim").circle(pos.x, pos.y);
				//this.move(this.pos.getDirectionTo(target));
				if (CreepIntentsCache.TestCreepIntent(this.id, "move")) {
					let retCode = this.moveTo(target);
					if (retCode == OK) {
						CreepIntentsCache.AddCreepIntent(this.id, "move");
					} else {
						Logger.ErrorCode(`ReachAction:${this.name}.moveTo(${JSON.stringify(Convert.ToPosEntity(target))}`, retCode);
						return "fail";
					}
				}
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
			return "fail";
		}
		const posEntity:PosEntity = rawParas[0];
		const range:number = rawParas[1];
		const pos = new RoomPosition(posEntity.x, posEntity.y, posEntity.roomName);
		const actionStatus = creep.reach(pos, range);
		return actionStatus;
	}
}
