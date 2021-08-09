import { DatasetManager } from "data/DatasetManager";
import { UniqueId } from "utils/UniqueId";

interface TimeoutEntity extends Entity {
	created: number
}
interface TimeoutContext extends Context {
	Add(entity: TimeoutEntity): void
	Remove(entity: TimeoutEntity): void
	Update(entity: TimeoutEntity): void
	Get(id: string): TimeoutEntity | undefined
	Create(): TimeoutEntity
	CreateAndAdd(): TimeoutEntity
}

export const TimeoutContext: TimeoutContext = {
	route: "timeout",
	Initialize() {
		DatasetManager.Create(this.route, [], [], false);
	},
	Add(entity: TimeoutEntity) {
		DatasetManager.Add(this.route, entity);
	},
	Remove(entity: TimeoutEntity) {
		DatasetManager.Remove(this.route, entity);
	},
	Update(entity: TimeoutEntity) {
		DatasetManager.Update(this.route, entity);
	},
	Get(id: string) {
		return DatasetManager.GetById<TimeoutEntity>(this.route, id);
	},
	Create() {
		return { id: UniqueId.Get(), created: Game.time };
	},
	CreateAndAdd() {
		const entity = { id: UniqueId.Get(), created: Game.time };
		this.Add(entity);
		return entity;
	}
}
