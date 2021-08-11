import { ActionContext } from "./ActionContext";
import { ResourceLockContext } from "./ResourceLockContext";
import { TaskContext } from "./TaskContext";
import { TimeoutContext } from "./TimeoutContext";

export function MountContexts() {
	ActionContext.Initialize();
	TaskContext.Initialize();
	TimeoutContext.Initialize();
	ResourceLockContext.Initialize();
}
