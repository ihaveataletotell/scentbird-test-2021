import {LazyEmitter} from 'classes/lazyEmitter';

// основы общения между сущностями в программировании и просто классика жанра
export class Notifier<T = void> {
	private _listeners: Set<(arg: T) => void>;

	constructor() {
		this._listeners = new Set();
	}

	subscribe(listener: (arg: T) => void): void {
		this._listeners.add(listener);
	}

	unsubscribe(listener: (arg: T) => void): void {
		this._listeners.delete(listener);
	}

	signal(arg: T): void {
		this._listeners.forEach(x => x(arg));
	}
}

export class Receiver<T> extends Notifier<T> {
	private _received: T | undefined;

	signal(arg: T) {
		this._received = arg;
		super.signal(arg);
	}

	get received(): T | undefined {
		return this._received;
	}
}

export class LazyReceiver<T> extends Receiver<T> {
	signal(arg: T) {
		if (this.received == arg) return;
		super.signal(arg);
	}
}

export class ThrottledReceiver<T> extends LazyReceiver<T> {
	private _lazyEmitter: LazyEmitter<T>;

	constructor() {
		super();

		this._lazyEmitter = new LazyEmitter<T>(super.signal.bind(this), 150);
	}

	signal(arg: T) {
		this._lazyEmitter.call(arg);
	}
}