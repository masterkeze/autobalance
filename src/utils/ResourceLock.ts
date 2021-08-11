import { ActionContext } from "contexts/ActionContext";
import { ResourceLockContext } from "contexts/ResourceLockContext";

export class ResourceLock {
	static LockAsync(object: { store: StoreDefinition, id: string }, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number): ActionEntity {
		const resourceLockEntity = ActionContext.CreateAndAdd(object.id, "resourceLock", [taskId, direction, resourceType, amount]);
		return resourceLockEntity;
	}
	static WaitForLock(object: { store: StoreDefinition, id: string }, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number):ActionStatus {
		if (!object) return "fail";
		const resourceLocks = ResourceLockContext.GetResourceLocksByObjectId(object.id);
		const relatedLocks = resourceLocks.filter((lock) => {
			lock.direction == direction
				&& lock.resourceType == resourceType
		});
		let onWayAmount = 0;
		_.map(relatedLocks, (lock) => onWayAmount += lock.amount);
		if (direction == "in") {
			if (amount + onWayAmount <= object.store.getFreeCapacity(resourceType)) {
				// 可以锁
				ResourceLockContext.CreateAndAdd(object.id, taskId, direction, resourceType, amount);
				return "complete";
			} else {
				return "running";
			}
		} else {
			if (amount + onWayAmount <= object.store.getUsedCapacity(resourceType)) {
				// 可以锁
				ResourceLockContext.CreateAndAdd(object.id, taskId, direction, resourceType, amount);
				return "complete";
			} else {
				return "running";
			}
		}
	}

	static RunLockAction(resourceLockEntity: ActionEntity) {
		const rawParas = resourceLockEntity.parameters;
		const operatorId = resourceLockEntity.operatorId;
		const object = Game.getObjectById<StructureStorage>(operatorId);
		if (!object) return "fail";
		const taskId = rawParas[0];
		const direction = rawParas[1];
		const resourceType = rawParas[2];
		const amount = rawParas[3];
		return ResourceLock.WaitForLock(object, taskId, direction, resourceType, amount);
	}
}
