const ReportInterval = 60;
const ErrorNotifyInterval = 30;
export default class Logger {
	public static info(msg:string,module?:string,method?:string) {
		let information = `${new Date().toLocaleString()}[info][${Game.shard.name}][${Game.time}]`;
		if (module) {
			information += `[${module}]`;
		}
		if (method) {
			information += `[${method}]`;
		}
		information += msg;
		console.log(information);
	}
	public static error(msg: string, module?: string, method?: string) {
		let information = `${new Date().toLocaleString()}[error][${Game.shard.name}][${Game.time}]`;
		if (module) {
			information += `[${module}]`;
		}
		if (method) {
			information += `[${method}]`;
		}
		information += msg;
		console.log(information);
		Game.notify(msg, ErrorNotifyInterval);
	}
	public static notify(msg: string, module?: string, method?: string) {
		let information = `${new Date().toLocaleString()}[report][${Game.shard.name}][${Game.time}]`;
		if (module) {
			information += `[${module}]`;
		}
		if (method) {
			information += `[${method}]`;
		}
		information += msg;
		console.log(information);
		Game.notify(msg, ReportInterval);
	}
}
