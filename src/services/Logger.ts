type Colors = "red" | "green" | "yellow" | "blue";
type LogLevels = "info" | "error" | "notify";
const ReportInterval = 60;
const ErrorNotifyInterval = 30;

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
	public static Notify(caller: string, msg: string) {
		this.Log("notify", caller, msg, "yellow");
	}
}
