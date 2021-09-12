import * as React from 'react';

export interface UXDropdownState {
	itemsOpen?: boolean;
}

export interface IUXDropdownItem {
	caption: string;
	id: string;
}

export interface UXDropdownSharedProps extends UXBasicVCProps {
	items?: IUXDropdownItem[];
	value?: string;
	isDisabled?: boolean;
}

export interface UXDropdownProps<T = React.ReactNode> extends UXDropdownSharedProps {
	VC?: React.ComponentType<UXDropdownVCProps<T>>;
	onChange?(e: ReactClickEvent | null, selectedId: string): void;
}

export interface UXDropdownVCProps<T = React.ReactNode> extends UXMapToVCProps<UXDropdownSharedProps> {
	isItemsOpen?: boolean;
	onClick(e: ReactClickEvent): void;
	onKeyPress(e: ReactClickEvent): void;
	rootRef: React.RefObject<HTMLElement>;
	selectedItem: IUXDropdownItem | undefined;
}