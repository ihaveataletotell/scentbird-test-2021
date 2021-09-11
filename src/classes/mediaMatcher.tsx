import {receiver} from 'main/mainVar';
import {LazyReceiver} from 'classes/notifier';

export const enum ScreenWidth {
	least = 1,
	mobile = 320,
	tabletPortrait = 590,
	tabletLandscape = 884,
	desktop = 1100,
}

export class MediaMatcher extends LazyReceiver<ScreenWidth> {
	constructor() {
		super();

		receiver.windowResize.subscribe(this.handleCalcScreenWidth);
		this.handleCalcScreenWidth();
	}

	private handleCalcScreenWidth = () => {
		const found = [
			ScreenWidth.desktop,
			ScreenWidth.tabletLandscape,
			ScreenWidth.tabletPortrait,
			ScreenWidth.mobile,
		].find(x => window.matchMedia(`(min-width: ${x}px)`).matches);

		const result = found ?? ScreenWidth.least;

		this.signal(result);
	}

	get hasWideCol2(): boolean {
		return (
			!!this.received
			&& this.received > ScreenWidth.mobile
			// && this.received != ScreenWidth.tabletLandscape
		);
	}
}

