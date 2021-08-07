import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

interface ActionContext extends Context {
	Add(entity: ActionEntity): void
	Remove(entity: ActionEntity): void
	Update(entity: ActionEntity): void
	Get(id: string): ActionEntity | undefined
	Create(operatorId: string, type: string, parameters: any[]): ActionEntity
	CreateAndAdd(operatorId: string, type: string, parameters: any[]): ActionEntity
	RemoveById(id: string): void
	RemoveByIds(ids:string[]):void
}


export const ActionContext: ActionContext = {
	route: "action",
	Initialize() {
		DatasetManager.Create(this.route, [], [], false);
	},
	Add(action: ActionEntity) {
		DatasetManager.Add(this.route, action);
	},
	Remove(action: ActionEntity) {
		DatasetManager.Remove(this.route, action);
	},
	Update(action: ActionEntity) {
		DatasetManager.Update(this.route, action);
	},
	Get(id: string): ActionEntity | undefined {
		return DatasetManager.GetById<ActionEntity>(this.route, id);
	},
	Create(operatorId: string, type: string, parameters: any[]): ActionEntity {
		const action: ActionEntity = {
			id: UniqueId.Get(),
			operatorId: operatorId,
			type: type,
			parameters: parameters,
		};
		return action;
	},
	CreateAndAdd(operatorId: string, type: string, parameters: any[]): ActionEntity {
		const action: ActionEntity = {
			id: UniqueId.Get(),
			operatorId: operatorId,
			type: type,
			parameters: parameters,
		};
		this.Add(action);
		return action;
	},
	RemoveById(id: string) {
		const entity = this.Get(id);
		if (entity) {
			this.Remove(entity);
		}
	},
	RemoveByIds(ids: string[]) {
		for (const id of ids) {
			this.RemoveById(id);
		}
	}
}
