import { ActionContext } from "contexts/ActionContext";
import { MethodManager } from "data/MethodManager";

export const mountCreepAction = function () {
	mountPrototypes();
	mountMethods();
}

function mountMethods() {
	const map:{[methodName:string]:Function} = {
		"Creep.prototype.reach": Creep.prototype.reach,
		"Creep.prototype.withdrawOnce": Creep.prototype.withdrawOnce
	}
	for (const methodName in map) {
		MethodManager.mount(methodName, map[methodName]);
	}
}

function mountPrototypes() {
	Creep.prototype.reach = function (target, range = 1) {
		if (!target || !this) return "fail";
		const pos: RoomPosition = (target as any).pos ? (target as any).pos as RoomPosition : target as RoomPosition;
		if (this.pos.getRangeTo(pos) > range) {
			this.moveTo(target);
			return "running";
		} else {
			return "complete";
		}
	}

	Creep.prototype.withdrawOnce = function (target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number) {
		if (!target || !this) return "fail";
		if (this.pos.getRangeTo(target.pos) > 1) return "fail";
		let retCode = Creep.prototype.withdraw.call(this, target, resourceType, amount);
		if (retCode != OK) {
			return "fail";
		} else {
			return "complete";
		}
	}

	Creep.prototype.withdrawOnceAsync = function (target: Structure | Tombstone | Ruin, resourceType: ResourceConstant, amount?: number) {
		return ActionContext.Create(this.id, "Creep.prototype.withdrawOnce", [target.id,resourceType,amount?amount:null]);
	}
}

