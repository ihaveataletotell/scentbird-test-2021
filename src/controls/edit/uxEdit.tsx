import * as React from 'react';
import cn from 'classnames';
import {UXEditProps, UXEditVCProps} from 'controls/edit/types';
import {withLabelHoc} from 'controls/label/withLabel';
import * as css from './uxEdit.sass';

const InputElement = (props: UXEditVCProps): React.ReactElement => {
	return (
		<input
			autoComplete={props.autoComplete}
			className={props.className}
			data-name={'edit'}
			maxLength={props.maxLength}
			name={props.name}
			onBlur={props.onBlur}
			onChange={props.onChange}
			placeholder={props.placeholder}
			readOnly={props.isDisabled}
			title={props.title}
			type={props.type}
			value={props.value}
		/>
	);
}

class UXEditVC extends React.PureComponent<UXEditVCProps> {
	get className(): string {
		const {props} = this;

		return cn(
			css.edit,
			props.isDisabled && css.edit_disabled,
			props.errorMessage && css.edit_hasError,
			props.className,
		);
	}

	render(): React.ReactElement {
		const {props} = this;

		return (
			<div
				className={this.className}
				data-name={'editContainer'}
			>
				<InputElement
					{...props}
					className={css.edit__input}
					children={undefined}
					title={props.title ?? props.placeholder}
					placeholder={undefined}
				/>

				{props.children}
			</div>
		);
	}
}

class UXEdit extends React.PureComponent<UXEditProps> {
	static defaultProps: Partial<UXEditProps> = {
		VC: UXEditVC,
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {props} = this;
		const value = e.target.value;

		if (props.isDisabled || props.value == value) return;
		this.props.onChange?.(e, e.target.value);
	}

	render(): React.ReactElement {
		const {props} = this;
		const VC = props.VC!;

		return (
			<VC
				autoComplete={props.autoComplete}
				children={props.children}
				className={props.className}
				errorMessage={props.errorMessage}
				isDisabled={props.isDisabled}
				maxLength={props.maxLength}
				name={props.name}
				onBlur={props.onBlur}
				onChange={this.handleChange}
				placeholder={props.placeholder!}
				title={props.title}
				type={props.type}
				value={props.value || ''}
			/>
		);
	}
}

export const UXEditWithLabel = withLabelHoc(UXEdit);