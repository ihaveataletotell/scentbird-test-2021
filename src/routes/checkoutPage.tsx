import * as React from 'react';
import {ShippingAddressForm} from 'components/shippingAddressForm/shippingAddressForm';

interface CheckoutProps {}

export class CheckoutPage extends React.PureComponent<CheckoutProps> {
	state = {};

	render(): React.ReactElement {
		return (
			<ShippingAddressForm />
		);
	}
}