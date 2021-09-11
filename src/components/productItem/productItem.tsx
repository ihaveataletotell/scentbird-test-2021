import * as React from 'react';
import cn from 'classnames';
import * as css from './productItem.sass';

interface ProductItemProps {}

export class ProductItem extends React.PureComponent<ProductItemProps> {
	state = {};

	render(): React.ReactElement {
		const {props} = this;

		return (
			<div children={'productItem'} />
		);
	}
}