import { ResourceLock } from "utils/ResourceLock";

export const ResourceLockAction: Action = {
	type: "resourceLock",
	mount() { },
	run(resourceLockEntity: ActionEntity) {
		return ResourceLock.RunLockAction(resourceLockEntity);
	}
}
