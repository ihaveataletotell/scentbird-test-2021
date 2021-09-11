import * as React from 'react';
import {ProductItem} from 'components/productItem/productItem';

interface ProductPageProps extends ProductPageRouteProps {}

interface ProductPageRouteProps {
	match: {
		params: {
			id: string;
		}
	}
}

export class ProductPage extends React.PureComponent<ProductPageProps> {
	state = {};

	get productRouteId(): string {
		return this.props.match.params.id;
	}

	render(): React.ReactElement {

		return (
			<>
				<div
					children={`product page ${this.productRouteId}`}
				/>

				<ProductItem

				/>
			</>
		);
	}
}