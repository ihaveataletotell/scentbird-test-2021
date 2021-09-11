import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AppRoute} from 'mainVar';

const MainPage = React.lazy(() => import('routes/mainPage').then(x => ({default: x.MainPage})));
const ProductPage = React.lazy(() => import('routes/productPage').then(x => ({default: x.ProductPage})));
const CheckoutPage = React.lazy(() => import('routes/checkoutPage').then(x => ({default: x.CheckoutPage})));

export const MainRouterSwitch = React.memo(
	function MainRouteSwitch() {
		return (
			<React.Suspense
				fallback={'Loading...'}
			>
				<Switch>
					<Route
						exact
						path={AppRoute.main}
						component={MainPage}
					/>

					<Route
						path={AppRoute.productWithId}
						component={ProductPage}
					/>

					<Route
						path={AppRoute.checkout}
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