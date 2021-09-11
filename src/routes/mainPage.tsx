import * as React from 'react';
import {UXEditWithLabel} from 'controls/edit/uxEdit';
import {NavLinkStyled} from 'smallComponents/navLinkStyled';

interface MainPageProps {}

interface MainState {
	value?: string
}

export class MainPage extends React.PureComponent<MainPageProps, MainState> {
	state: MainState = {};

	render(): React.ReactElement {
		const {state} = this;

		return (
			<div>
				<p children={'Main page'} />
				<p children={'Products:'} />

				<NavLinkStyled
					to={'/product/1'}
					style={{marginBottom: 50, display: 'block'}}
					children={'SCENTBIRD Rose & Prosecco Hand Cream hardcoded id'}
				/>

				<UXEditWithLabel
					errorMessage={'error'}
					onChange={(e, value) => this.setState({value})}
					placeholder={'First Name'}
					value={state.value}
				/>
			</div>
		);
	}
}