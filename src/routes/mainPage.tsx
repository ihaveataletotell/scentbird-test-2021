import * as React from 'react';
import {NavLinkStyled} from 'smallComponents/navLinkStyled';

interface MainPageProps {}

export class MainPage extends React.PureComponent<MainPageProps> {
	render(): React.ReactElement {
		return (
			<div>
				<p children={'Main page'} />
				<p children={'Products:'} />

				<NavLinkStyled
					to={'/product/1'}
					style={{marginBottom: 50, display: 'block'}}
					children={'SCENTBIRD Rose & Prosecco Hand Cream hardcoded id'}
				/>
			</div>
		);
	}
}