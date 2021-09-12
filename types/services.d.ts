interface Service {
	route: string
	CreateIfNotExists(route:string, roomName:string):ServiceEntity
	Run(entity: ServiceEntity): void
	RunAll():void
}



interface SpawnService extends Service {
	Spawn(producerId: string, roomName: string, body: BodyPartConstant[], opts?: SpawnOptions): void
	Recycle(producerId: string, roomName: string, creep: Creep): void
	Renew(producerId: string, roomName: string, creep: Creep): void
}
