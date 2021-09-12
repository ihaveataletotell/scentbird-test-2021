// типо throttle, только называется нормально
export class LazyEmitter<T = void> {
	private _callArg: T | undefined;
	private _callBlocked: boolean;
	private _needCall: boolean;
	private _timeout: number | undefined;
	private readonly _delay: number;
	private _method: (arg: T) => void;

	constructor(method: (arg: T) => void, delay = 300) {
		this._callBlocked = false;
		this._delay = delay;
		this._method = method;
		this._needCall = false;

		this.resetTimeout();
	}

	private resetTimeout = (): void => {
		window.clearTimeout(this._timeout);
		this._timeout = window.setTimeout(this.handleTimeout, this._delay);
	};

	private handleTimeout = (): void => {
		this._callBlocked = false;
		if (!this._needCall) return;
		this.call(this._callArg!);
	};

	destroy = (): void => {
		this._callArg = undefined;
		this._needCall = false;
		window.clearTimeout(this._timeout);
	}

	call = (arg: T): void => {
		if (this._callBlocked) {
			this._callArg = arg;
			this._needCall = true;
			return;
		}

		this._method(arg);
		this.destroy();
		this._callBlocked = true;
		this.resetTimeout();
	};
}