import { DatasetManager } from "utils/DatasetManager"

interface CommandContext extends Context{

}

interface Command extends Entity{
	operatorId: string
	type: string
	method: string
	parameter: any
}

export const CommandContext: CommandContext = {
	route:"command",
	Initialize() {
		DatasetManager.Create(this.route, [], [{
			indexName: "operatorId",
			clustered: false
		}],true)
	},
	Add(command: Command) {
		DatasetManager.Add(this.route, command);
	},
	Remove(command: Command) {
		DatasetManager.Remove(this.route, command);
	},
	Update(command: Command) {
		DatasetManager.Update(this.route, command);
	},
	Get(id: string) {
		return DatasetManager.GetById<Command>(this.route,id);
	}
}
