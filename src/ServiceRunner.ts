import { allServices } from "services";

export class ServiceRunner {
	public static RunAll() {
		_.map(allServices, (service) => service.RunAll());
	}
}
