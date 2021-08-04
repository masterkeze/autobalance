import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

interface ActionContext extends Context {
	Create(operatorId: string, type: string, parameters: any[]): ActionEntity
	CreateAndAdd(operatorId: string, type: string, parameters: any[]): ActionEntity
}


export const ActionContext: ActionContext = {
	route: "command",
	Initialize() {
		DatasetManager.Create(this.route, [], [], true)
	},
	Add(command: ActionEntity) {
		DatasetManager.Add(this.route, command);
	},
	Remove(command: ActionEntity) {
		DatasetManager.Remove(this.route, command);
	},
	Update(command: ActionEntity) {
		DatasetManager.Update(this.route, command);
	},
	Get(id: string) {
		return DatasetManager.GetById<ActionEntity>(this.route, id);
	},
	Create(operatorId: string, type: string, parameters: any[]): ActionEntity {
		const action: ActionEntity = {
			id: UniqueId.Get(),
			operatorId: operatorId,
			type: type,
			parameters: parameters,
			status: "waiting"
		};
		return action;
	},
	CreateAndAdd(operatorId: string, type: string, parameters: any[]): ActionEntity {
		const action: ActionEntity = {
			id: UniqueId.Get(),
			operatorId: operatorId,
			type: type,
			parameters: parameters,
			status: "waiting"
		};
		this.Add(action);
		return action;
	}
}
