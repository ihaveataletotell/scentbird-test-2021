import * as React from 'react';
import {ComponentUtils, containsSafe, UXUtils} from 'common/componentUtils';
import {IUXDropdownItem, UXDropdownProps, UXDropdownState} from 'controls/dropdown/types';
import {UXDropdownVC} from 'controls/dropdown/uxDropdownVC';

export class UXDropdown extends React.Component<UXDropdownProps, UXDropdownState> {
	static defaultProps: Partial<UXDropdownProps> = {
		VC: UXDropdownVC,
	}

	protected readonly _rootNodeRef: React.RefObject<HTMLElement>;

	protected constructor(props: UXDropdownProps) {
		super(props);
		(this.state as UXDropdownState) = {};
		this._rootNodeRef = React.createRef();
	}

	static getDerivedStateFromProps(props: UXDropdownProps): UXDropdownState | null {
		if (props.isDisabled) return {itemsOpen: false};
		return null;
	}

	componentDidMount() {
		window.addEventListener('click', this.handleWindowClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleWindowClick);
	}

	get rootHtml(): HTMLElement | null {
		return this._rootNodeRef.current;
	}

	get isDisabled(): boolean {
		const {props} = this;
		return !!props.isDisabled;
	}

	get selectedItem(): IUXDropdownItem | undefined {
		return this.props.items?.find(x => x.id == this.props.value);
	}

	closeItems = (): void => {
		if (this.state.itemsOpen) {
			this.setState({itemsOpen: false});
		}
	}

	openItems = (): void => {
		if (this.isDisabled) return;

		if (!this.state.itemsOpen) {
			this.setState({itemsOpen: true});
		}
	}

	toggleItems = (): void => {
		if (this.state.itemsOpen) return this.closeItems();
		return this.openItems();
	}

	handleWindowClick = (e: MouseEvent): void => {
		if (this.isDisabled) return;
		if (this.rootHtml?.contains(e.target as Node)) return;

		if (containsSafe(this.rootHtml!, e.target as Node)) {
			e.preventDefault();
			this.toggleItems();
			return;
		}

		this.closeItems();
	}

	handleClick = (e: ReactClickEvent): void => {
		const {props} = this;
		if (this.isDisabled) return;

		const header = UXUtils.getDataNameEl(e, 'selectHeader');
		if (header) {
			this.toggleItems();
			return;
		}

		const itemHtml = UXUtils.getDataNameEl(e, 'selectItem');

		const newSelectedItem = props.items?.find(x => x.id == itemHtml?.dataset.itemId);
		if (!newSelectedItem) return;

		props.onChange?.(e, newSelectedItem.id);
		this.toggleItems();
	}

	handleKeyPress = ComponentUtils.dispatchOnEnterThunk(this.handleClick);

	render(): JSX.Element {
		const {props, state} = this;
		const VC = props.VC!;

		return (
			<VC
				children={props.children}
				className={props.className}
				isDisabled={props.isDisabled}
				isItemsOpen={state.itemsOpen}
				items={props.items}
				onClick={this.handleClick}
				onKeyPress={this.handleKeyPress}
				placeholder={props.placeholder}
				rootRef={this._rootNodeRef}
				selectedItem={this.selectedItem}
				value={props.value}
			/>
		);
	}
}