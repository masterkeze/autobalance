import { ResourceLockContext } from "contexts/ResourceLockContext";

export class VisualHelper {
	static DrawResourceLocks(object: StructureStorage) {
		const visual = new RoomVisual(object.room.name);
		const locks = ResourceLockContext.GetResourceLocksByObjectId(object.id);
		const mapping: {
			[resourceType: string]: {
				"in": number,
				"out": number
			}
		} = {};
		_.map(locks, (lock) => {
			if (!mapping[lock.resourceType]) {
				mapping[lock.resourceType] = {
					"in": 0,
					"out": 0
				}
			}
			mapping[lock.resourceType][lock.direction] += lock.amount;
		});
		let baseX = object.pos.x + 0.7;
		let baseY = object.pos.y - 0.6;
		const font = 0.4;
		const gap = font;
		for (const resourceType of Object.keys(mapping)) {
			let inAmount = mapping[resourceType].in;
			let outAmount = mapping[resourceType].out;
			let inAmounString = inAmount.toString();
			let outAmountString = outAmount.toString();
			if (inAmount > 1000) {
				inAmounString = _.round(inAmount / 1000, 2).toString() + "k";
			}
			if (outAmount > 1000) {
				outAmountString = _.round(outAmount / 1000, 2).toString() + "k";
			}
			if (inAmount != 0 || outAmount != 0) {
				visual.text(` ${resourceType.length > 2 ? resourceType.substring(0, 2) : resourceType}`, baseX+0.3, baseY, { color: "white", font: font, align: 'left' });
				visual.text(_.padRight(`<${inAmounString}`, 5), baseX, baseY + gap, { color: "green", font: font, align: 'left' });
				visual.text(_.padRight(`>${outAmountString}`, 5), baseX, baseY + 2 * gap, { color: "red", font: font, align: "left" });
				baseY += 3*gap + 0.1;
			}
		}
	}
}
