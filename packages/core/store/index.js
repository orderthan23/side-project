import create from 'zustand';
import CustomLogger from '@core/console';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

class StoreManager {
	/**
	 * @abstract
	 */
	static TARGET_STORE_HOOK = new Error('TARGET_STORE_HOOK MUST BE OVERRIDE');

	static localStorageStoreBuilder(initialState, storeName) {
		return create(
			CustomLogger.storeWatcher(
				persist(
					devtools(
						immer(() => initialState),
						{ name: storeName },
					),
					{
						name: storeName,
					},
				),
				storeName,
			),
		);
	}

	static sessionStorageStoreBuilder(initialState, storeName) {
		return create(
			CustomLogger.storeWatcher(
				persist(
					devtools(
						immer(() => initialState),
						{ name: storeName },
					),
					{
						name: storeName,
						getStorage: () => window.sessionStorage,
					},
				),
				storeName,
			),
		);
	}

	static storeBuilder(initialState, storeName) {
		return create(
			CustomLogger.storeWatcher(
				devtools(
					immer(() => initialState),
					{ name: storeName },
				),
				storeName,
			),
		);
	}

	/**
	 * zustand custom setter
	 * @param {function} stateChanger  전역 상태 변경 함수
	 * @param {string} actionType 발생할 액션의 이름
	 * @returns {*}
	 */
	static setState(stateChanger, actionType) {
		return this.TARGET_STORE_HOOK.setState(stateChanger, false, actionType);
	}

	/**
	 * zustand custom getter
	 * @param something
	 * @returns {*}
	 */
	static getState(...something) {
		return this.TARGET_STORE_HOOK?.getState(...something);
	}
}

export default StoreManager;
