import * as React from 'react';

interface CheckoutProps {}

export class CheckoutPage extends React.PureComponent<CheckoutProps> {
	state = {};

	render(): React.ReactElement {
		return (
			<div
				children={'checkout page'}
			/>
		);
	}
}