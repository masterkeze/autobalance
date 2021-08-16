import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

export const MessageContext: MessageContext = {
	route: "message",
	Initialize(){
		DatasetManager.Create(this.route, [], [{
			indexName: "route",
			clustered: false
		}, {
			indexName: "producer",
			clustered: false
		}], false);
	},
	Add(message: MessageEntity) {
		DatasetManager.Add(this.route, message);
	},
	Remove(message: MessageEntity) {
		DatasetManager.Remove(this.route, message);
	},
	Update(message: MessageEntity) {
		DatasetManager.Update(this.route, message);
	},
	Get(id: string) {
		return DatasetManager.GetById<MessageEntity>(this.route, id);
	},
	Create(route:string,roomName:string,producer:string,data:any) {
		return { id: UniqueId.Get(), route,roomName,producer,data,createTick:Game.time,state:"pending" };
	},
	CreateAndAdd(route: string, roomName: string, producer: string, data: any) {
		const message = this.Create(route, roomName, producer, data);
		this.Add(message);
		return message;
	},
	GetByRoute(route: string) {
		return DatasetManager.GetByProperty(this.route, "route", route);
	},
	GetByProducer(producer: string) {
		return DatasetManager.GetByProperty(this.route, "producer", producer);
	}
}
