import { DatasetManager } from "data/DatasetManager";
import { UniqueId } from "utils/UniqueId";

export const ServiceContext: ServiceContext = {
	route: "service",
	Initialize() {
		DatasetManager.Create(this.route, [], [{
			indexName: "route",
			clustered: false
		}, {
			indexName: "roomName",
			clustered: false
		}], false);
	},
	Add(service: ServiceEntity) {
		DatasetManager.Add(this.route, service);
	},
	Remove(service: ServiceEntity) {
		DatasetManager.Remove(this.route, service);
	},
	Update(service: ServiceEntity) {
		DatasetManager.Update(this.route, service);
	},
	Get(id: string) {
		return DatasetManager.GetById<ServiceEntity>(this.route, id);
	},
	Create(route: string, roomName: string, data: any) {
		return { id: UniqueId.Get(), route, roomName,creepNames:[], data };
	},
	CreateAndAdd(route: string, roomName: string, data: any) {
		const serviceEntity = this.Create(route, roomName, data);
		this.Add(serviceEntity);
		return serviceEntity;
	},
	GetByRoute(route: string) {
		return DatasetManager.GetByProperty(this.route, "route", route);
	},
	GetByRouteAndRoomName(route: string, roomName: string) {
		return DatasetManager.GetByProperties(this.route, [{ property: "route", value: route }, { property: "roomName", value: roomName }]);
	}
}
