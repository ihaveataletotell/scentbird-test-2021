import * as React from 'react';
import cn from 'classnames';
import {cssUtility} from 'common/cssHelper';
import {ComponentUtils} from 'common/componentUtils';
import {UXTabsItemSingleSwitchVCProps, UXTabsSwitchVCProps, UXTabSwitchProps} from 'controls/tabs/types';
import * as css from './uxTabs.sass';

export function UXTabsSwitch(props: UXTabSwitchProps): React.ReactElement | null {
	const VC = props.VC || UXTabsSwitchVC;
	const [activeId, setActiveId] = React.useState(props.defaultActiveId || props.items?.[0]?.id);

	const onSelect = React.useCallback<UXTabsSwitchVCProps['onSelect']>((e, data) => {
		setActiveId(data.id);
	}, []);

	return (
		<VC
			activeId={activeId}
			items={props.items}
			onRenderActiveTabContent={props.onRenderActiveTabContent}
			onSelect={onSelect}
		/>
	)
}

export function UXTabsSwitchVC(props: UXTabsSwitchVCProps): React.ReactElement | null {
	if (!props.items?.length) return null;

	const tabs = props.items.map(x => {
		return (
			<UXTabsItemSingleSwitchVC
				data={x}
				isActive={props.activeId == x.id}
				key={x.id}
				onSelect={props.onSelect}
			/>
		)
	});

	const activeTabContent = props.items.find(x => x.id == props.activeId) || props.items[0];

	return (
		<>
			<div className={css.tabsItems}>
				{tabs}
			</div>

			{props.onRenderActiveTabContent?.(activeTabContent)}
		</>
	);
}

function UXTabsItemSingleSwitchVC(props: UXTabsItemSingleSwitchVCProps): React.ReactElement {
	const {isActive, onSelect, data} = props;

	const onClick = React.useCallback((e: ReactClickEvent) => {
		if (isActive) return;
		onSelect(e, data);

	}, [isActive, onSelect, data]);

	const onKeyDown = React.useCallback(
		ComponentUtils.dispatchOnEnterThunk(onClick),
		[onClick]
	);

	return (
		<div
			children={props.data.caption}
			className={cn(
				props.className,
				css.tabsItem,
				cssUtility.flexCenter,
				props.isActive && css.tabsItem_active,
			)}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={0}
		/>
	);
}