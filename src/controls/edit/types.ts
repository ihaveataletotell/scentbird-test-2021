import * as React from 'react';

export interface UXAbstractEditProps extends UXEditSharedProps {
	VC?: React.ComponentType<UXEditVCProps>;
	onChange?(e: React.ChangeEvent, value: string): void;
}

export interface UXEditSharedProps<T = string> extends UXBasicVCProps {
	errorMessage?: string;
	maxLength?: number;
	name?: string;
	onBlur?(e: React.FocusEvent): void;
	type?: string;
	value?: T;
}

export interface UXEditVCProps extends UXMapToVCProps<UXEditSharedProps> {
	onChange(e: React.ChangeEvent): void;
}