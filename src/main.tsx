import 'sass/normalize.sass';
import React from 'react';
import {UXEditWithLabel} from 'controls/edit/uxEdit';
import * as css from './main.sass';

interface MainProps {}

interface MainState {
	value?: string
}

export class Main extends React.PureComponent<MainProps, MainState> {
	state: MainState = {};

	render(): React.ReactElement {
		const {state} = this;

		return (
			<div className={css.main}>
				<div className={css.header}>Scentbird App</div>

				<UXEditWithLabel
					onChange={(e, value) => this.setState({value})}
					value={state.value}
					placeholder={'First Name'}
					errorMessage={'error'}
				/>
			</div>
		);
	}
}