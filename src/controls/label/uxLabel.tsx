import * as React from 'react';
import cn from 'classnames';
import * as css from './uxLabel.sass';
import {UXLabelVCProps} from 'controls/label/types';

export const UXLabel = (props: Partial<UXLabelVCProps>) => {
	if (!props.children) return null;

	return (
		<label
			htmlFor={props.htmlFor}
			children={props.children}
			className={cn(css.label, props.hasValue && css.label_hasValue)}
		/>
	)
}