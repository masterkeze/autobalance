import { Logger } from "services/Logger";


function EnsureCreated() {
	if (!global.methods) global.methods = {};
}

export class MethodManager {
	static mount(methodName:string, method:Function) {
		EnsureCreated();
		global.methods[methodName] = method;
	}
}
