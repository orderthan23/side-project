import { isEqual, reduce } from 'lodash';

export default class CustomLogger {
	static info(...param: string[]) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.log(...param);
		}
	}

	static error(...param: any[]) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.error(...param);
		}
	}

	static warning(...param: any[]) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.warn(...param);
		}
	}

	static groupCollapsed(...param: string[]) {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.groupCollapsed(...param);
		}
	}

	static groupEnd() {
		if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
			console.groupEnd();
		}
	}

	static storeWatcher = (config, storeName: string) => (set: (arg0: any) => void, get: () => any, api: any) => {
		return config(
			(args: any) => {
				const beforeState = get();
				set(args);
				const currentState = get();

				if (JSON.parse(process.env.NEXT_PUBLIC_USE_LOGGER)) {
					const changer = reduce(
						beforeState,
						function (result: any[], value: any, key: string | number) {
							const prevValue = currentState ? currentState[key] : undefined;
							return isEqual(value, prevValue)
								? result
								: result.concat({
										key,
										before: value,
										after: prevValue,
								  });
						},
						[],
					);

					if (changer.length > 0) {
						this.groupCollapsed('%cGlobal State Change Detected', 'color: teal; font-size : 14px;  font-weight : bold;', storeName);
						this.info(`%cBEFORE : `, 'color : green', beforeState);
						this.info('%cAFTER : ', 'color : yellow', currentState);
						this.info(`%cCHANGE : `, 'color : green', changer);
						this.groupEnd();
					}
				}
			},
			get,
			api,
		);
	};

	static httpWatcher(response: { config: any; status: any; data: any; }) {
		const { config, status, data } = response;
		this.groupCollapsed('%cHTTP Call Results : ', 'color: olive; font-size : 14px;  font-weight : bold;', config?.url);
		this.info('%cSTATUS : ', 'color : green', status);
		this.info('%cDATA : ', 'color : yellow', data);
		this.groupEnd();
	}
}
