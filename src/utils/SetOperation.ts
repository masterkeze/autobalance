export class SetOperation {
	static Intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
		return new Set([...a].filter(e => b.has(e)));
	}
	static Union<T>(a: Set<T>, b: Set<T>): Set<T> {
		return new Set([...a, ...b]);
	}
	static Difference<T>(a: Set<T>, b: Set<T>): Set<T> {
		return new Set([...a].filter(e => !b.has(e)));
	}
}
