import { MountActions } from "engine/actions";
import { MountContexts } from "data/contexts";
import { Logger } from "utils/Logger";

export function MountAll() {
	if (!global.mounted) {
		Logger.Info("Mount.MountAll", "global mounted!");
		global.mounted = true;
		MountActions();
		MountContexts();
	}
}
