import { IntentsCache } from "data/cache/IntentsCache";
import { ActionContext } from "data/contexts/ActionContext";
import { Logger } from "utils/Logger";
import { Convert } from "utils/Convert";

export const WithdrawOnceAction: Action = {
	type: "withdrawOnce",
	mount() {
		const _this = this;
		Creep.prototype.withdrawOnce = function (target, resourceType, amount) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) == 1) {
				if (IntentsCache.TestCreepIntent(this.id, "withdraw")) {
					let retCode = this.withdraw(target, resourceType, amount);
					if (retCode == OK) {
						IntentsCache.AddCreepIntent(this.id, "withdraw");
					} else {
						Logger.ErrorCode(`TransferOnceAction:${this.name}.withdraw(${target.id},${resourceType},${amount ? amount : null})`, retCode);
						return "fail";
					}
					return "complete";
				} else {
					return "running";
				}

			} else {
				return "fail";
			}
		};
		Creep.prototype.withdrawOnceAsync = function (target, resourceType, amount) {
			const withdrawOncAction = ActionContext.CreateAndAdd(this.id, _this.type, [target.id, resourceType,amount?amount:null]);
			return withdrawOncAction;
		};
	},
	run(withdrawOncAction: ActionEntity) {
		const rawParas = withdrawOncAction.parameters;
		const operatorId = withdrawOncAction.operatorId;
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
		const actionStatus = creep.withdrawOnce(target, resourceType, amount);
		return actionStatus;
	}
}
