export class Convert {
	public static ToPosEntity(target: RoomPosition | { pos: RoomPosition }): PosEntity{
		const pos: RoomPosition = this.ToRoomPosition(target);
		return {
			roomName: pos.roomName,
			x: pos.x,
			y: pos.y
		}
	}

	public static ToRoomPosition(target: RoomPosition | { pos: RoomPosition }): RoomPosition{
		return (target as any).pos ? (target as any).pos as RoomPosition : target as RoomPosition;
	}
}
