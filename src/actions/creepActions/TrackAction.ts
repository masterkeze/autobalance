import { ActionContext } from "contexts/ActionContext";
import { Convert } from "utils/Convert";

export const TrackAction: Action = {
	type: "track",
	mount() {
		const _this = this;
		Creep.prototype.track = function (target, range = 1) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) > range) {
				//new RoomVisual("sim").circle(pos.x, pos.y);
				this.move(this.pos.getDirectionTo(target));
				//this.moveTo(target);
				return "running";
			} else {
				return "complete";
			}
		};
		Creep.prototype.trackAsync = function (target, range = 1) {
			const trackAction = ActionContext.CreateAndAdd(this.id, _this.type, [target.id, range]);
			return trackAction;
		};
	},
	run(trackAction: ActionEntity) {
		const rawParas = trackAction.parameters;
		const operatorId = trackAction.operatorId;
		const creep = Game.getObjectById<Creep>(operatorId);
		if (!creep) {
			return "fail";
		}
		const targetId:string = rawParas[0];
		const target = Game.getObjectById<Creep>(targetId);
		if (!target) {
			return "fail";
		}
		const range: number = rawParas[1];
		const actionStatus = creep.track(target, range);
		return actionStatus;
	}
}
