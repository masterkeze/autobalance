import { MountActions } from "actions";
import { MountContexts } from "contexts";
import { Logger } from "services/Logger";

export function MountAll() {
	if (!global.mounted) {
		Logger.Info("Mount.MountAll", "global mounted!");
		global.mounted = true;
		MountActions();
		MountContexts();
	}
}
