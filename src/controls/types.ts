import {UXAbstractEditProps} from 'controls/edit/types';

export interface ThisFileHasExport {}

declare global {
	interface UXBasicVCProps extends UXInnerBasics, VCProps {}

	interface UXEditProps extends UXAbstractEditProps {}

	// нам нужно передавать все пропсы в VC, но не все могут быть определены
	type UXMapToVCProps<T extends object> = {[K in keyof Required<T>]: T[K] | undefined};
}

interface UXInnerBasics extends VCWithClass {
	isDisabled?: boolean;
	placeholder?: string;
}