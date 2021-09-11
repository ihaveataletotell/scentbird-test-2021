import * as React from 'react';

export interface UXLabelVCProps extends Required<UXLabelSharedProps> {
	rootRef: React.Ref<HTMLLabelElement>;
}

export interface UXLabelSharedProps extends VCProps, VCWithDoNotRender {
	htmlFor?: string;
	hasValue?: boolean;
}

export interface UXAbstractLabelProps extends UXLabelSharedProps {
	VC?: React.ComponentType<UXLabelVCProps>;
}