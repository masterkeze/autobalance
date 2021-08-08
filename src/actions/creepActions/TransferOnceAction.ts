import { CreepIntentsCache } from "cache/CreepIntentsCache";
import { ActionContext } from "contexts/ActionContext";
import { Logger } from "services/Logger";
import { Convert } from "utils/Convert";

export const transferOnceAction: Action = {
	type: "transferOnce",
	mount() {
		const _this = this;
		Creep.prototype.transferOnce = function (target, resourceType, amount) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) == 1) {
				if (CreepIntentsCache.TestCreepIntent(this.id, "transfer")) {
					let retCode = this.transfer(target, resourceType, amount);
					if (retCode == OK) {
						CreepIntentsCache.AddCreepIntent(this.id, "transfer");
						return "complete";
					} else {
						Logger.ErrorCode(`TransferOnceAction:${this.name}.transfer(${target.id},${resourceType},${amount ? amount : null})`, retCode);
						return "fail";
					}
				} else {
					return "running";
				}

			} else {
				return "fail";
			}
		};
		Creep.prototype.transferOnceAsync = function (target, resourceType, amount) {
			const transferOncAction = ActionContext.CreateAndAdd(this.id, _this.type, [target.id, resourceType, amount ? amount : null]);
			return transferOncAction;
		};
	},
	run(transferOncAction: ActionEntity) {
		const rawParas = transferOncAction.parameters;
		const operatorId = transferOncAction.operatorId;
		const creep = Game.getObjectById<Creep>(operatorId);
		if (!creep) {
			return "fail";
		}
		const targetId: string = rawParas[0];
		const target = Game.getObjectById<StructureStorage>(targetId);
		if (!target) {
			return "fail";
		}
		const resourceType: ResourceConstant = rawParas[1];
		const amount: number | undefined = rawParas[2] == null ? undefined : rawParas[2];
		const actionStatus = creep.transferOnce(target, resourceType, amount);
		return actionStatus;
	}
}
