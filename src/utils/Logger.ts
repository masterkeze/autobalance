type Colors = "red" | "green" | "yellow" | "blue";
type LogLevels = "info" | "error" | "notify";
const ReportInterval = 60;
const ErrorNotifyInterval = 30;
const errors:{[code:number]:string} = {};
errors[ERR_NOT_OWNER] = "ERR_NOT_OWNER";
errors[ERR_NO_PATH] = "ERR_NO_PATH";
errors[ERR_NAME_EXISTS] = "ERR_NAME_EXISTS";
errors[ERR_BUSY] = "ERR_BUSY";
errors[ERR_NOT_FOUND] = "ERR_NOT_FOUND";
errors[ERR_NOT_ENOUGH_RESOURCES] = "ERR_NOT_ENOUGH_RESOURCES";
errors[ERR_NOT_ENOUGH_ENERGY] = "ERR_NOT_ENOUGH_ENERGY";
errors[ERR_INVALID_TARGET] = "ERR_INVALID_TARGET";
errors[ERR_FULL] = "ERR_FULL";
errors[ERR_NOT_IN_RANGE] = "ERR_NOT_IN_RANGE";
errors[ERR_INVALID_ARGS] = "ERR_INVALID_ARGS";
errors[ERR_TIRED] = "ERR_TIRED";
errors[ERR_NO_BODYPART] = "ERR_NO_BODYPART";
errors[ERR_NOT_ENOUGH_EXTENSIONS] = "ERR_NOT_ENOUGH_EXTENSIONS";
errors[ERR_RCL_NOT_ENOUGH] = "ERR_RCL_NOT_ENOUGH";
errors[ERR_GCL_NOT_ENOUGH] = "ERR_GCL_NOT_ENOUGH";
/**
 * 在绘制控制台信息时使用的颜色
 */
const colors = {
	red: '#ef9a9a',
	green: '#6b9955',
	yellow: '#c5c599',
	blue: '#8dc5e3',
};

/**
 * 给指定文本添加颜色
 *
 * @param content 要添加颜色的文本
 * @param colorName 要添加的颜色常量字符串
 */
export function colorful(content: string, colorName?: Colors): string {
	const colorStyle = colorName ? `color: ${colors[colorName]};` : ''
	return `<text style="${colorStyle}">${content}</text>`
}

export class Logger {
	public static Log(level: LogLevels, caller: string, msg: string, colorName?: Colors) {
		let message = `[${level}][${caller}] ${msg}`;
		let colorfulText = colorful(message, colorName);
		let notifyText = `${new Date().toLocaleDateString()}${message}`
		console.log(colorfulText);
		switch (level) {
			case "error":
				Game.notify(notifyText, ErrorNotifyInterval);
				break;
			case "notify":
				Game.notify(notifyText, ErrorNotifyInterval);
				break;
			default:
				break;
		}
	}
	public static Info(caller: string, msg: string) {
		this.Log("info", caller, msg);
	}
	public static Error(caller: string, msg: string) {
		this.Log("error", caller, msg, "red");
	}
	public static ErrorCode(caller: string, code: number) {
		this.Log("error", caller, errors[code], "red");
	}
	public static Notify(caller: string, msg: string) {
		this.Log("notify", caller, msg, "yellow");
	}
}
