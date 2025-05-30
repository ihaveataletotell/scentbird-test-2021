import * as React from 'react';
import type {Receiver} from './notifier';

type ReceiverReturnType<T> = [T | undefined, (arg: T) => void];

export class HookCore {
	private static fnIncrementer = (x: number): number => ++x % 10;

	// попробовал законнектить мое мини-ооп в хуки, вроде что-то вышло
	public static useReceiver = <T>(instance: Receiver<T>): ReceiverReturnType<T> => {
		const [_, forceUpdate] = React.useReducer(HookCore.fnIncrementer, 0);

		React.useEffect(() => {
			instance.subscribe(forceUpdate);
			return () => instance.unsubscribe(forceUpdate);
		}, [forceUpdate, instance]);

		const setValue = React.useCallback((arg: T) => {
			instance.signal(arg);
		}, [instance]);

		return [instance.received, setValue];
	}
}
