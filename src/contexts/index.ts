import { ActionContext } from "./ActionContext";
import { TaskContext } from "./TaskContext";

export function MountContexts() {
	ActionContext.Initialize();
	TaskContext.Initialize();
}
