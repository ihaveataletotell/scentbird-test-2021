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

	private _productHardcoded: DM.Product.Data = {
		category: 'Hand Cream',
		name: 'Rose & Prosecco',
		nameOfMaker: 'SCENTBIRD',
		description: 'The new olfactory variation of Eau de Cartier reveals its unexpected ardent woody freshness. Essence de Bois is the unexpected combination of the freshness of water and the warmth of precious wood. This alluring fragrance leaves a lingering trail for him and for her, both fresh and sensual The new olfactory variation of Eau de Cartier reveals its unexpected ardent woody freshness. Essence de Bois is the unexpected combination of the freshness of water and the warmth of precious wood. This alluring fragrance leaves a lingering trail for him and for her, both fresh and sensual',
		gender: 'uni',
		id: '1000',
		howItWorks: 'Rebottled Eau de Cartier Essence de Bois, rebottled by Scentbird, Inc., an independent bottler from a genuine product wholly independent of Cartier\n Scentbird, Inc., New York, NY 10001',
		ingredients: 'Eau de Cartier reveals its unexpected ardent woody freshness. Essence de Bois is the unexpected combination of the freshness of water and the warmth of precious wood. This alluring fragrance leaves a lingering trail for him and for her, both fresh',
		issueKinds: [
			{countLeft: 10, id: '1', productId: '1000', productPrice: 1495, productSize: '1.7 oz', paymentType: 'subscription', previewUrl: 'https://sun9-16.userapi.com/impg/kTgLUlJkVE43R-aR93bQvEjBt6pbkOaZPB2KSQ/aq0nG_--lSg.jpg?size=1120x1120&quality=96&sign=e58cab5263c86f259613afb16931c62b'},
			{countLeft: 10, id: '2', productId: '1000', productPrice: 1495, productSize: '1.7 oz', paymentType: 'onetime', previewUrl: 'https://sun9-16.userapi.com/impg/kTgLUlJkVE43R-aR93bQvEjBt6pbkOaZPB2KSQ/aq0nG_--lSg.jpg?size=1120x1120&quality=96&sign=e58cab5263c86f259613afb16931c62b'},
			{countLeft: 10, id: '3', productId: '1000', productPrice: 995, productSize: '1 oz', paymentType: 'onetime', previewUrl: 'https://sun9-16.userapi.com/impg/kTgLUlJkVE43R-aR93bQvEjBt6pbkOaZPB2KSQ/aq0nG_--lSg.jpg?size=1120x1120&quality=96&sign=e58cab5263c86f259613afb16931c62b'},
		],
		reviews: [
			{rating: 4.2, id: '1', date: Date.now(), productId: '1000', productIssueTypeId: '222', text: 'test'},
			{rating: 4.4, id: '1', date: Date.now(), productId: '1000', productIssueTypeId: '222', text: 'test'},
			{rating: 4.3, id: '1', date: Date.now(), productId: '1000', productIssueTypeId: '222', text: 'test'},
		],
	};

	render(): React.ReactElement {

		return (
			<ProductItem
				data={this._productHardcoded}
			/>
		);
	}
}