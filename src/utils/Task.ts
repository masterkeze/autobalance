import { UniqueId } from "./UniqueId";

export class Task {
	private _id: string;

	constructor() {
		this._id = UniqueId.Get();
	}
	Wait(actionEntity:ActionEntity) {

	}
	WaitAny(...actionEntities:ActionEntity[]) {

	}

	WaitAll(...actionEntities:ActionEntity[]) {

	}

	static Run() {

	}
}

