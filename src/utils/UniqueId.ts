export class UniqueId{
	static Get():string {
		return _.uniqueId(Game.time.toString());
	}
}
