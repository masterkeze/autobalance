import { ActionContext } from "data/contexts/ActionContext";
import { TimeoutContext } from "data/contexts/TimeoutContext";

export const TimeoutAction: Action = {
	type:"timeout",
	run(timeoutAction: ActionEntity) {
		const rawParas = timeoutAction.parameters;
		const operatorId = timeoutAction.operatorId;
		if (!operatorId) {
			const timeoutEntity = TimeoutContext.CreateAndAdd();
			timeoutAction.operatorId = timeoutEntity.id;
			ActionContext.Update(timeoutAction);
			return "intime";
		} else {
			const lifetime = rawParas[0];
			const timeoutEntity = TimeoutContext.Get(operatorId);
			if (!timeoutEntity) {
				return "fail";
			}
			if (Game.time > timeoutEntity.created + lifetime) {
				return "timeout"
			}
		}
		return "intime";
	}
}
