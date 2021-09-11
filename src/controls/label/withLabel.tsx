import {UXLabel} from 'controls/label/uxLabel';
import * as React from 'react';
import {VCIfHasChildren} from 'common/vcBranch';
import * as css from './withLabel.sass';

interface WithLabelProps {
	errorMessage?: string;
}

interface WrappedComponentProps extends WithLabelProps, VCWithSlot {
	name?: string;
	placeholder?: string;
	value?: string;
}

export const withLabelHoc = <P extends WrappedComponentProps>(
	WrappedComponent: React.ComponentClass<P>
): React.ComponentType<P> => {

	return (props: P) => {
		const children = (
			<>
				<UXLabel
					hasValue={!!props.value}
					htmlFor={props.name}
					children={props.placeholder}
				/>

				<VCIfHasChildren
					className={css.errorMessage}
					children={props.errorMessage}
				/>

				{props.children}
			</>
		);

		return (
			<WrappedComponent
				{...props}
				children={children}
			/>
		);
	}
}