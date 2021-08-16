import { ResourceLock } from "engine/ResourceLock";

export const ResourceLockAction: Action = {
	type: "resourceLock",
	run(resourceLockEntity: ActionEntity) {
		return ResourceLock.RunLockAction(resourceLockEntity);
	}
}
