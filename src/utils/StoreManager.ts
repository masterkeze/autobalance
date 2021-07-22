

export class StoreManager {
	private static get storage() {
		return Memory.storeManager;
	}
	/**
	 * 可取：实际储量-在途取出储量
	 * @param  {{store:StoreDefinition,id:string} gameObject
	 * @param  {ResourceConstant} resourceType?
	 */
	public static getAvailableToWithdraw(gameObject: { store: StoreDefinition, id: string}, resourceType?: ResourceConstant) {

	}
	/**
	 * 可存：总容量-(实际储量+在途存入储量)
	 * @param  {{store:StoreDefinition,id:string} gameObject
	 * @param  {ResourceConstant} resourceType?
	 */
	public static getAvailableToTransfer(gameObject: { store: StoreDefinition, id: string }, resourceType?: ResourceConstant) {

	}
}
