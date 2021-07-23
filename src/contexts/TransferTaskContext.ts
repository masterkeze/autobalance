import { Logger } from "utils/Logger";
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
			}, {
				clustered: true,
				indexName: "resourceType"
			}, {
				clustered: false,
				indexName: "fromId"
			}], false);
	}

	public static Create(from: { pos: RoomPosition, id: string }, to: { pos: RoomPosition, id: string }, resourceType: ResourceConstant, amount: number) {
		let transferTask: TransferTask = {
			id: _.uniqueId(Game.time.toString()),
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
	public static GetByResourceType(resourceType: ResourceConstant) {
		return DatasetManager.GetByProperty<TransferTask>(this.route, "resourceType", resourceType);
	}
	public static GetByFromId(fromId: string) {
		return DatasetManager.GetByProperty<TransferTask>(this.route, "fromId", fromId);
	}

	public static Add(transferTask: TransferTask) {
		Logger.info(`Adding Task: ${JSON.stringify(transferTask)}`);
		DatasetManager.Add(this.route, transferTask);
	}

	public static Remove(entity: TransferTask) {
		Logger.info(`Removing Task: ${JSON.stringify(entity)}`);
		DatasetManager.Remove(this.route, entity);
	}

	public static Update(entity: TransferTask) {
		Logger.info(`Updating Task: ${JSON.stringify(entity)}`);
		DatasetManager.Update(this.route, entity);
	}
}
