import { AllActions } from "actions";
import { ActionContext } from "contexts/ActionContext";
import { Logger } from "services/Logger";
let _mapActionByType: { [type: string]: Action };

function getActionMapping(): { [type: string]: Action } {
	if (!_mapActionByType) {
		_mapActionByType = {};
		AllActions.forEach((action) => {
			_mapActionByType[action.type] = action;
		})
		return _mapActionByType;
	} else {
		return _mapActionByType;
	}
}
export class ActionRunner {
	static Run(actionEntity:ActionEntity):ActionStatus {
		const type = actionEntity.type;
		const map = getActionMapping();
		const action = map[type];
		if (!action) {
			Logger.Error("Action.Run", `Unknown action type: ${type}`);
			return "fail";
		} else {
			let result: ActionStatus = "fail";
			try {
				result = action.run(actionEntity);
			} catch (error) {
				Logger.Error("Action.Run", `Failed to run action ${JSON.stringify(actionEntity)} with error ${error}`);
			}
			return result;
		}
	}
	static RunById(actionEntityId: string): ActionStatus {
		const actionEntity = ActionContext.Get(actionEntityId);
		if (!actionEntity) {
			Logger.Error("Action.RunById", `Unknown actionEntityId: ${actionEntityId}`);
			return "fail";
		} else {
			return this.Run(actionEntity);
		}
	}
	static RunByIds(actionEntityIds: string[]): ActionStatus[] {
		const results: ActionStatus[] = [];
		actionEntityIds.forEach((id) => {
			results.push(this.RunById(id));
		});
		return results;
	}
}
