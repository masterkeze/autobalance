import { ActionContext } from "contexts/ActionContext";
import { Convert } from "utils/Convert";

export const WithdrawOnceAction: Action = {
	type: "withdrawOnce",
	mount() {
		const _this = this;
		Creep.prototype.withdrawOnce = function (target, resourceType, amount) {
			if (!target || !this) return "fail";
			const pos: RoomPosition = Convert.ToRoomPosition(target);
			if (this.pos.getRangeTo(pos) == 1) {
				let retCode = this.withdraw(target, resourceType, amount);
				if (retCode == OK) {
					return "complete";
				} else {
					return "fail";
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
