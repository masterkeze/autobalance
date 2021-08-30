import { RoomCache } from "data/cache/RoomCache";
import { MessageContext } from "data/contexts/MessageContext"
import { ServiceContext } from "data/contexts/ServiceContext";



interface SpawnData {
	body: BodyPartConstant[]
	opts?: SpawnOptions
}

interface RecycleData {
	creepId: string
}

interface RenewData {
	creepId: string
}

type SpawnServiceData = {
	type: "spawn" | "recycle" | "renew"
	data: SpawnData|RecycleData|RenewData;
};



export const SpawnService: SpawnService = {
	route: "spawnService",
	CreateIfNotExists(route: string, roomName: string): ServiceEntity{
		const entities = ServiceContext.GetByRouteAndRoomName(this.route, roomName);
		if (entities.length == 0) {
			return ServiceContext.CreateAndAdd(this.route, roomName, {});
		} else {
			return entities[0];
		}
	},
	Spawn(producerId: string, roomName: string, body: BodyPartConstant[], opts?: SpawnOptions): void {
		const entity = this.CreateIfNotExists(this.route, roomName);
		const spawnServiceData: SpawnServiceData = {
			type: "spawn",
			data: {body,opts}
		}
		MessageContext.CreateAndAdd(producerId, entity.id, spawnServiceData);
	},
	Recycle(producerId: string, roomName: string, creep: Creep): void{
		const entity = this.CreateIfNotExists(this.route, roomName);
		const spawnServiceData: SpawnServiceData = {
			type: "recycle",
			data: { creepId:creep.id }
		}
		MessageContext.CreateAndAdd(producerId, entity.id, spawnServiceData);
	},
	Renew(producerId: string, roomName: string, creep: Creep): void{
		const entity = this.CreateIfNotExists(this.route, roomName);
		const spawnServiceData: SpawnServiceData = {
			type: "renew",
			data: { creepId: creep.id }
		}
		MessageContext.CreateAndAdd(producerId, entity.id, spawnServiceData);
	},
	Run(entity: ServiceEntity) {

	}
}
