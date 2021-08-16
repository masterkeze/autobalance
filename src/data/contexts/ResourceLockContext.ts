import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

export const ResourceLockContext: ResourceLockContext = {
	route: "resourceLock",
	Initialize() {
		DatasetManager.Create(this.route, [], [{
			indexName: "objectId",
			clustered: false
		}, {
			indexName: "taskId",
			clustered: false
		}], false);
	},
	Add(resourceLock: ResourceLockEntity) {
		DatasetManager.Add(this.route, resourceLock);
	},
	Remove(resourceLock: ResourceLockEntity) {
		DatasetManager.Remove(this.route, resourceLock);
	},
	Update(resourceLock: ResourceLockEntity) {
		DatasetManager.Update(this.route, resourceLock);
	},
	Get(id: string) {
		return DatasetManager.GetById<ResourceLockEntity>(this.route, id);
	},
	Create(objectId: string, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number) {
		return { id: UniqueId.Get(), objectId:objectId,taskId:taskId,direction:direction,resourceType:resourceType,amount:amount };
	},
	CreateAndAdd(objectId: string, taskId: string, direction: "in" | "out", resourceType: ResourceConstant, amount: number) {
		const resourceLock = this.Create(objectId, taskId, direction, resourceType, amount);
		this.Add(resourceLock);
		return resourceLock;
	},
	GetResourceLocksByTaskId(taskId: string) {
		return DatasetManager.GetByProperty<ResourceLockEntity>(this.route, "taskId", taskId);
	},
	GetResourceLocksByObjectId(objectId: string) {
		return DatasetManager.GetByProperty<ResourceLockEntity>(this.route, "objectId", objectId);
	},
	RemoveByTaskId(taskId: string) {
		const locks = this.GetResourceLocksByTaskId(taskId);
		_.map(locks, (lock) => this.Remove(lock));
	}
}
