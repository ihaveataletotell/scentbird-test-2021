import * as React from 'react';
import cn from 'classnames';
import {IUXDropdownItem, UXDropdownVCProps} from 'controls/dropdown/types';
import {ExtendedVC} from 'common/vcBranch';
import {ComponentUtils} from 'common/componentUtils';
import * as css from './uxDropdownVC.module.sass';

export class UXDropdownVC extends React.PureComponent<UXDropdownVCProps> {
	get className(): string {
		const {props} = this;

		return cn(
			css.dropdown,
			props.className,
			props.isDisabled && css.dropdown_disabled,
			props.isItemsOpen && css.dropdown_open,
			props.selectedItem && css.dropdown_hasValue,
		);
	}

	renderItems(): React.ReactElement[] | undefined {
		const {props} = this;

		return props.items?.map((x) => {
			const isSelected = x && props.selectedItem == x;

			return (
				<UXDropdownItem
					item={x}
					key={x.id}
					className={isSelected && css.dropdown__item_selected}
				/>
			);
		});
	}

	renderItemsBox(): React.ReactElement | null {
		const {props} = this;
		if (!props.isItemsOpen) return null;

		return (
			<UXDropdownItems
				slotItemsInner={this.renderItems()}
			/>
		);
	}

	renderHeader(): React.ReactElement {
		const {props} = this;

		return (
			<ExtendedVC
				className={css.dropdown__header}
				datasetName={'selectHeader'}
				tabIndex={0}
				title={props.selectedItem?.caption}
			>
				<div
					className={cn(css.header__caption)}
				>
					{props.selectedItem?.caption || props.placeholder || 'Choose value'}
				</div>

				<svg
					width="10"
					height="10"
					viewBox="0 0 10 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={cn(css.header__icon)}
				>
					<path d="M9.24264 5L5 9.24264L0.757359 5H9.24264Z" fill="#FF458F"/>
				</svg>
			</ExtendedVC>
		);
	}

	handleClick = (e: ReactClickEvent): void => {
		this.props.onClick?.(e);
	}

	handleKeyPress = ComponentUtils.dispatchOnEnterThunk(this.handleClick);

	render(): React.ReactElement {
		const {props} = this;

		return (
			<div
				className={this.className}
				data-name={'select'}
				onClick={this.handleClick}
				onKeyPress={this.handleKeyPress}
				ref={props.rootRef as React.RefObject<HTMLDivElement>}
			>
				{this.renderHeader()}

				{this.renderItemsBox()}
			</div>
		);
	}
}

export interface UXDropdownVCItemsProps extends VCProps {
	slotItemsInner?: React.ReactNode;
}

export const UXDropdownItems = React.memo(
	function UXDropdownVCItems(props: UXDropdownVCItemsProps): React.ReactElement | null {
		return (
			<div
				className={cn(
					css.dropdown__items,
					props.className,
				)}
				data-name={'selectItems'}
			>
				<div
					className={css.dropdown__itemsInner}
					data-name={'selectItemsInner'}
				>
					{props.slotItemsInner}
				</div>

				{props.children}
			</div>
		);
	}
);

interface UXDropdownItemProps extends VCProps {
	item: IUXDropdownItem;
}

function UXDropdownItem(props: UXDropdownItemProps): React.ReactElement | null {
	if (!props.item) return null;

	return (
		<ExtendedVC
			className={cn(css.dropdown__item, props.className)}
			datasetItemId={props.item.id}
			datasetName={'selectItem'}
			tabIndex={0}
			title={props.item.caption}
		>
			<div
				className={css.dropdown__itemText}
			>
				{props.item.caption}
			</div>

			{props.children}
		</ExtendedVC>
	);
}