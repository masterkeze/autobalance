import { DatasetManager } from "data/DatasetManager"
import { UniqueId } from "utils/UniqueId";

export const MessageContext: MessageContext = {
	route: "message",
	Initialize(){
		DatasetManager.Create(this.route, [], [{
			indexName: "consumerId",
			clustered: false
		}, {
			indexName: "producerId",
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
	Create(consumerId: string, producerId: string, data:any) {
		return { id: UniqueId.Get(), consumerId,producerId,data,createTick:Game.time,state:"pending" };
	},
	CreateAndAdd(consumerId: string, producerId: string, data: any) {
		const message = this.Create(consumerId,producerId, data);
		this.Add(message);
		return message;
	},
	GetByConsumerId(consumerId: string) {
		return DatasetManager.GetByProperty(this.route, "consumerId", consumerId);
	},
	GetByProducerId(producerId: string) {
		return DatasetManager.GetByProperty(this.route, "producerId", producerId);
	}
}
