import { CacheManager } from 'data/CacheManager';
import { Logger } from 'utils/Logger';
import { SetOperation } from 'utils/SetOperation';

type CreepIntent =
	| 'harvest'
	| 'attack'
	| 'build'
	| 'repair'
	| 'dismantle'
	| 'attackController'
	| 'rangedHeal'
	| 'heal'
	| 'rangedAttack'
	| 'rangedMassAttack'
	| 'upgradeController'
	| 'withdraw'
	| 'transfer'
	| 'drop'
	| 'move';
type CreepIntents = CreepIntent[];

const conflictGroup1: Set<CreepIntent> = new Set([
	'harvest',
	'attack',
	'build',
	'repair',
	'dismantle',
	'attackController',
	'rangedHeal',
	'heal',
]);
const conflictGroup2: Set<CreepIntent> = new Set([
	'rangedAttack',
	'rangedMassAttack',
	'build',
	'repair',
	'rangedHeal',
]);
const conflictGroup3: Set<CreepIntent> = new Set([
	'upgradeController',
	'build',
	'repair',
	'transfer',
	'withdraw',
	'drop',
]);
const conflictGroups = [conflictGroup1, conflictGroup2, conflictGroup3];

export class IntentsCache {
	static route = 'creepintents';
	static lifetime = 0;
	static Get(creepId: string): CreepIntents | undefined {
		return CacheManager.Get<CreepIntents>(this.route, this.lifetime, creepId);
	}
	static Set(creepId: string, creepIntents: CreepIntents) {
		return CacheManager.Set<CreepIntents>(this.route, this.lifetime, creepId, creepIntents);
	}
	/**
	 * 校验intents是否碰撞
	 * @param  {string} creepId
	 * @param  {CreepIntent} creepIntent
	 * @returns boolean true-no-conflict false-conflict
	 */
	static TestCreepIntent(creepId: string, creepIntent: CreepIntent): boolean {
		const creepIntents = this.Get(creepId);
		if (!creepIntents) {
			return true;
		}
		if (creepIntents.includes(creepIntent)) {
			return false;
		}
		const intentSet: Set<CreepIntent> = new Set(creepIntents);
		intentSet.add(creepIntent);
		for (const conflictGroup of conflictGroups) {
			const intersect = SetOperation.Intersect<CreepIntent>(conflictGroup, intentSet);
			if ([...intersect].length > 1) {
				return false;
			}
		}
		return true;
	}
	/**
	 * 不校验，直接添加intent
	 * @param  {string} creepId
	 * @param  {CreepIntent} creepIntent
	 */
	static AddCreepIntent(creepId: string, creepIntent: CreepIntent) {
		const creepIntents = this.Get(creepId);
		if (creepIntents && creepIntents.length > 0) {
			const newIntents = [...creepIntents, creepIntent];
			this.Set(creepId, newIntents);
		} else {
			this.Set(creepId, [creepIntent]);
		}
	}
	/**
	 * 先校验，再添加intent
	 * @param  {string} creepId
	 * @param  {CreepIntent} creepIntent
	 * @returns boolean
	 */
	static TryAddCreepIntent(creepId: string, creepIntent: CreepIntent): boolean {
		if (this.TestCreepIntent(creepId, creepIntent)) {
			this.AddCreepIntent(creepId, creepIntent);
			return true;
		} else {
			return false;
		}
	}
}
