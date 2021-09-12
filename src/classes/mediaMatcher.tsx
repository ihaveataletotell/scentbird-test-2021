import {LazyReceiver, Receiver} from 'classes/notifier';

export const enum ScreenWidth {
	least = 1,
	mobile = 320,
	tabletPortrait = 590,
	tabletLandscape = 884,
	desktop = 1100,
}

// ну этот дядя просто общается с ресивером ресайз эвента и смотрит, какая у нас сейчас верстка будет
// если сменили тип верстки, то уведомляем
export class MediaMatcher extends LazyReceiver<ScreenWidth> {
	constructor(
		private receiver: Receiver<number>
	) {
		super();

		receiver.subscribe(this.handleCalcScreenWidth);
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
		);
	}
}

