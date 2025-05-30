import 'sass/normalize.sass';
import 'sass/customize.sass';
import 'classes/linearFnLayout';
import './mainVarUsers';
import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {NavLinkStyled} from 'smallComponents/navLinkStyled';
import {MainRouterSwitch} from 'routes';
import {AppRoute} from 'main/mainVar';
import {DomEventBus} from 'main/domEventBus';
import * as css from 'main/main.sass';

export function ScentbirdReactApp(): React.ReactElement {
	return (
		<React.StrictMode>

			<BrowserRouter>

				<ErrorBoundaryMain>

					<div className={css.main}>
						<MainHeaderWithNavigation />

						<MainRouterSwitch />

						<DomEventBus />
					</div>

				</ErrorBoundaryMain>

			</BrowserRouter>

		</React.StrictMode>
	);
}

interface ErrorBoundaryMainState {
	error?: unknown;
}

class ErrorBoundaryMain extends React.PureComponent<{}, ErrorBoundaryMainState> {
	static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryMainState> {
		console.info('ErrorBoundary caught error here');

		return {error};
	}

	state: ErrorBoundaryMainState = {};

	render(): React.ReactNode {
		if (this.state.error) return 'Error occurred';

		return this.props.children;
	}
}

const MainHeaderWithNavigation = React.memo(
	function MainHeaderWithNavigation() {
		return (
			<div className={css.header}>
				<h3>Scentbird App</h3>

				<MainNavigation />
			</div>
		);
	}
);

const MainNavigation = function MainNavigation(): React.ReactElement {
	return (
		<>
			<NavLinkStyled
				to={AppRoute.main}
				exact
				children={'Home'}
			/>

			{' | '}

			<NavLinkStyled
				to={AppRoute.checkout}
				children={'Checkout'}
			/>

			{' | '}

			<NavLinkStyled
				to={`${AppRoute._product}/1`}
				children={'Product'}
			/>
		</>
	);
};