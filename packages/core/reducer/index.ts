import { useCallback } from 'react';

class ReducerManager {
	static reducerBuilder(draft: { [x: string]: any; }, action: { [x: string]: any; type?: any; }, reducerMap = null) {
		if (reducerMap) {
			// @ts-ignore
			return reducerMap[action.type]?.(draft, action) || draft;
		} else {
			Object.keys(action).forEach((key) => (draft[key] = action[key]));
		}
	}

	static combineActions(...actions: any[]) {
		return actions.reduce((newAction, action) => ({ ...action, ...newAction }), {});
	}

	static combineReducers =
		(...reducers: any[]) =>
		(prevState: any, value: any) =>
			reducers.reduce((newState, reducer) => reducer(newState, value), prevState);

	static actionBuilder(Actions = {}, dispatch: (arg0: any) => any) {
		const eventObj = {};
		Object.values(Actions).forEach((action) => {
			// @ts-ignore
			eventObj[action.name] = useCallback((...value) => dispatch(action(...value)), [dispatch]);
		});
		return eventObj;
	}
}

export default ReducerManager;
