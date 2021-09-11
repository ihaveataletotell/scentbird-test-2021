import 'sass/normalize.sass';
import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {NavLinkStyled} from 'smallComponents/navLinkStyled';
import * as css from './main.sass';

export function ScentbirdReactApp(): React.ReactElement {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<ErrorBoundaryMain>
					<div className={css.main}>
						<MainHeaderWithNavigation />

						<MainRouterSwitch />
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
		console.log('ErrorBoundary caught error');
		console.error(error);

		return {error};
	}

	state: ErrorBoundaryMainState = {};

	render(): React.ReactNode {
		if (this.state.error) return 'Error occurred';

		return this.props.children;
	}
}

const MainPage = React.lazy(() => import('routes/mainPage').then(x => ({default: x.MainPage})));
const ProductPage = React.lazy(() => import('routes/productPage').then(x => ({default: x.ProductPage})));
const CheckoutPage = React.lazy(() => import('routes/checkoutPage').then(x => ({default: x.CheckoutPage})));

const MainHeaderWithNavigation = React.memo(
	function MainHeaderWithNavigation() {
		return (
			<div className={css.header}>
				<h3>Scentbird App</h3>

				<MainNavigation />
			</div>
		);
	}
)

const MainRouterSwitch = React.memo(
	function MainRouteSwitch() {
		return (
			<React.Suspense
				fallback={'Loading...'}
			>
				<Switch>
					<Route
						exact
						path={'/'}
						component={MainPage}
					/>

					<Route
						path={'/product/:id'}
						component={ProductPage}
					/>

					<Route
						path={'/checkout'}
						component={CheckoutPage}
					/>

					<Redirect
						to={'/'}
					/>
				</Switch>
			</React.Suspense>
		);
	}
);

const MainNavigation = function MainNavigation(): React.ReactElement {
	return (
		<>
			<NavLinkStyled
				to={'/'}
				exact
				children={'Home'}
			/>

			{' | '}

			<NavLinkStyled
				to={'/checkout'}
				children={'Checkout'}
			/>

			{' | '}

			<NavLinkStyled
				to={'/product/1'}
				children={'Product'}
			/>
		</>
	);
}