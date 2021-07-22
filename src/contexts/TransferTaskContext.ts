import { DatasetManager } from "../utils/DatasetManager";
import { ContextBase } from "./ContextBase";

interface TransferTask extends Entity {
	fromId: string,
	fromRoomName: string,
	fromX: number,
	fromY: number,
	toId: string,
	toRoomName: string,
	toX: number,
	toY: number,
	resourceType: ResourceConstant,
	amount: number
}

export class TransferTaskContext extends ContextBase {
	static route: string = "transferTask";
	public static Initialize() {
		DatasetManager.Create(this.route, [],
			[{
				clustered: false,
				indexName: "fromRoomName"
			}, {
				clustered: false,
				indexName: "toRoomName"
			}], false);
	}

	public static Create(from: { pos: RoomPosition, id: string }, to: { pos: RoomPosition, id: string }, resourceType: ResourceConstant, amount: number) {
		let transferTask: TransferTask = {
			id: _.uniqueId(),
			fromId: from.id,
			fromRoomName: from.pos.roomName,
			fromX: from.pos.x,
			fromY: from.pos.y,
			toId: to.id,
			toRoomName: to.pos.roomName,
			toX: from.pos.x,
			toY: from.pos.y,
			resourceType: resourceType,
			amount: amount
		}
		return transferTask;
	}

	public static Get(id: string) {
		return DatasetManager.GetById<TransferTask>(this.route, id);
	}

	public static GetByFromRoomName(roomName: string) {
		return DatasetManager.GetByProperty<TransferTask>(this.route, "fromRoomName", roomName);
	}
	public static GetByToRoomName(roomName: string) {
		return DatasetManager.GetByProperty<TransferTask>(this.route, "toRoomName", roomName);
	}

	public static Add(transferTask: TransferTask) {
		DatasetManager.Add(this.route, transferTask);
	}

	public static Remove(entity: TransferTask) {
		DatasetManager.Remove(this.route, entity);
	}

	public static Update(entity: TransferTask) {
		DatasetManager.Update(this.route, entity);
	}
}
