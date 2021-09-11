import {ThrottledReceiver} from 'classes/notifier';

export const enum AppRoute {
	main = '/',
	checkout = '/checkout',
	product_Id = '/product/:id',
	product_Id_reviews = '/product/:id/reviews',

	_product = '/product',
}

export const receiver = {
	windowResize: new ThrottledReceiver<number>(),
}