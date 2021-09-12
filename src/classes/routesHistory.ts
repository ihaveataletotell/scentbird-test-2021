import {Receiver} from 'classes/notifier';

export class RoutesHistory extends Receiver<string> {
	private readonly _history: string[];

	constructor() {
		super();
		this._history = [window.location.pathname];
	}

	// первый прошлый отличный от текущего роут
	get prevRoute(): string | undefined {
		const location = window.location.pathname;

		for (let i = this._history.length - 1; i >= 0; i--) {
			if (this._history[i] != location) return this._history[i];
		}
	}

	signal(arg: string) {
		this._history.push(arg);
		super.signal(arg);
	}
}