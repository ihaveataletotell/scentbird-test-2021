import * as React from 'react';
import cn from 'classnames';
import {ComponentUtils} from 'common/componentUtils';
import {UXAbstractCheckboxProps, UXCheckboxVCProps} from 'controls/checkbox/types';
import * as css from './uxCheckbox.sass';

export class UXCheckbox extends React.PureComponent<UXAbstractCheckboxProps> {
	static defaultProps: Partial<UXAbstractCheckboxProps> = {
		VC: UXCheckboxVC,
	}

	handleChange = (e: ReactClickEvent): void => {
		const {props} = this;

		if (props.isDisabled) return;
		this.props.onChange?.(e, !this.props.isChecked);
	}

	render(): React.ReactElement {
		const {props} = this;
		const VC = props.VC!;

		return (
			<VC
				children={props.children}
				className={props.className}
				isChecked={props.isChecked}
				isDisabled={props.isDisabled}
				name={props.name}
				onBlur={props.onBlur}
				onClick={this.handleChange}
				placeholder={props.placeholder}
			/>
		);
	}
}

function UXCheckboxVC(props: UXCheckboxVCProps): React.ReactElement {
	const onClick = React.useCallback((e: ReactClickEvent) => {
		props.onClick(e);
	}, [props.onClick]);

	const onKeyDown = React.useCallback(
		ComponentUtils.dispatchOnEnterThunk(onClick),
		[onClick],
	);

	const className = cn(
		css.checkbox,
		props.isChecked && css.checkbox_checked,
		props.isDisabled && css.checkbox_disabled,
		props.className,
	);

	return (
		<div
			className={className}
			onClick={onClick}
			data-name={'checkboxContainer'}
			onKeyDown={onKeyDown}
			onBlur={props.onBlur}
			tabIndex={0}
		>
			<div
				className={css.checkbox__mark}
			>
				<div className={css.checkbox__markInner}>
					<SvgCheckboxMark
						className={css.checkbox__markIcon}
					/>
				</div>
			</div>

			{props.children}
		</div>
	);
}

function SvgCheckboxMark(props: VCProps): React.ReactElement {
	return (
		<svg
			width="12"
			height="9"
			viewBox="0 0 12 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
		>
			<path d="M0.255859 4.32798L1.90724 2.6766L6.22944 6.9988L4.57806 8.65018L0.255859 4.32798Z" fill="currentColor"/>
			<path d="M9.61719 0.116516L11.3854 1.88477L4.57462 8.69559L2.80637 6.92734L9.61719 0.116516Z" fill="currentColor"/>
		</svg>
	);
}