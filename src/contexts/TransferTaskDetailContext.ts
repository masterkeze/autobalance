import { Logger } from "utils/Logger";
import { DatasetManager } from "../utils/DatasetManager";
import { ContextBase } from "./ContextBase";

export class TransferTaskDetailContext extends ContextBase {
	static route: string = "transferTaskDetail";
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

	public static Create(from: { pos: RoomPosition, id: string }, to: { pos: RoomPosition, id: string }, resourceType: ResourceConstant, amount: number): TransferTaskDetail {
		let transferTaskDetail: TransferTaskDetail = {
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
		return transferTaskDetail;
	}

	public static Add(entity: TransferTaskDetail) {
		Logger.info(`Adding Task: ${JSON.stringify(entity)}`);
		DatasetManager.Add(this.route, entity);

	}

	public static Remove(entity: TransferTaskDetail) {
		Logger.info(`Removing Task: ${JSON.stringify(entity)}`);
		DatasetManager.Remove(this.route, entity);
	}

	public static Update(entity: TransferTaskDetail) {
		Logger.info(`Updating Task: ${JSON.stringify(entity)}`);
		DatasetManager.Update(this.route, entity);
	}

	public static Get(id: string) {
		return DatasetManager.GetById<TransferTaskDetail>(this.route, id);
	}

	public static GetByFromRoomName(roomName: string) {
		return DatasetManager.GetByProperty<TransferTaskDetail>(this.route, "fromRoomName", roomName);
	}
	public static GetByToRoomName(roomName: string) {
		return DatasetManager.GetByProperty<TransferTaskDetail>(this.route, "toRoomName", roomName);
	}
}
