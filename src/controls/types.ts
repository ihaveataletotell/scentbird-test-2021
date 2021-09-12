export interface ThisFileHasExport {}

declare global {
	interface UXBasicVCProps extends UXInnerBasics, VCProps {}

	// нам нужно передавать все пропсы в VC, но не все могут быть определены
	// чтобы при добавлении пропсов появлялась ошибка, тк их надо прокинуть внутри, несмотря на их опциональность снаружи
	type UXMapToVCProps<T extends object> = {[K in keyof Required<T>]: T[K] | undefined};
}

interface UXInnerBasics extends VCWithClass {
	isDisabled?: boolean;
	placeholder?: string;
}