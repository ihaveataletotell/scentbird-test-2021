import * as React from 'react';

export interface UXTabsItem<T extends string = string> {
	caption: string;
	id: T;
}

export interface UXTabSwitchSharedProps {
	onRenderActiveTabContent?(data: UXTabsItem): React.ReactElement | null;
	items?: UXTabsItem[];
}

export interface UXTabSwitchProps extends UXTabSwitchSharedProps {
	defaultActiveId?: string;
	VC?: React.ComponentType<UXTabsSwitchVCProps>;
}

export interface UXTabsSwitchVCProps extends UXMapToVCProps<UXTabSwitchSharedProps> {
	activeId: string | undefined;
	onSelect(e: ReactClickEvent, data: UXTabsItem): void;
}

export interface UXTabsItemSingleSwitchVCProps extends VCProps {
	data: UXTabsItem;
	isActive: boolean;
	onSelect(e: ReactClickEvent, data: UXTabsItem): void;
}