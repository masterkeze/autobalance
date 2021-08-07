import { Task } from "utils/Task";

export function SpiralMoveTask(center:RoomPosition, edgeLength: number, creep1: Creep, creep2: Creep, creep3: Creep, creep4: Creep) {
	const task = new Task();
	const diffX = edgeLength / 2;
	const diffY = edgeLength / 2;
	const leftTopPos = new RoomPosition(center.x - diffX, center.y - diffY, center.roomName);
	const rightTopPos = new RoomPosition(center.x + diffX, center.y - diffY, center.roomName);
	const leftBottomPos = new RoomPosition(center.x - diffX, center.y + diffY, center.roomName);
	const rightBottomPos = new RoomPosition(center.x + diffX, center.y + diffY, center.roomName);
	const p1 = creep1.reachAsync(leftTopPos, 0);
	const p2 = creep2.reachAsync(rightTopPos, 0);
	const p3 = creep3.reachAsync(leftBottomPos, 0);
	const p4 = creep4.reachAsync(rightBottomPos, 0);
	task.WaitAll(p1, p2, p3, p4);
	const p5 = creep1.trackAsync(creep3);
	const p6 = creep2.trackAsync(creep1);
	const p7 = creep4.trackAsync(creep2);
	const p8 = creep3.trackAsync(creep4);
	task.WaitAll(p5, p6, p7, p8);
}
