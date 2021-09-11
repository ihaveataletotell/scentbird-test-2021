// мостик между dom и react
declare global {
	// название блока html разметки (не полагаемся на css, тк он может быть модульным, а может и не быть...)
	type UXDataName =
		| 'editContainer'
		| 'edit'
		| 'checkboxContainer'
		| UXDataNameSelect
		| 'tabItem'

	// действие элемента, которое совершается в контроле (не приложении), при клике на него
	type UXDataAction =
		| 'close'
		| 'open'

	// расширение библиотеки типов реакта. Уточняем типы на нужных нам пропертях
	namespace React {
		interface HTMLAttributes<T> extends DataToInstance {}
		interface SVGAttributes<T> extends DataToInstance {}
	}

	type ReactMouseEvent<T = HTMLOrSVGElement> = React.MouseEvent<T>;
	type ReactKeyboardEvent<T = HTMLOrSVGElement> = React.KeyboardEvent<T>;
	type ReactMouseEventHandler<T = HTMLOrSVGElement> = React.MouseEventHandler<T>;
	type ReactKeyboardEventHandler<T = HTMLOrSVGElement> = React.KeyboardEventHandler<T>;

	// современный стандарт, любой клик может быть как с клавиатуры, так и с мышки, это надо обрабатывать
	type ReactClickEvent<T = HTMLOrSVGElement> = ReactMouseEvent<T> | ReactKeyboardEvent<T>;
	type ReactClickEventCallback = (e: ReactClickEvent) => void;
	type ReactClickEventHandler<T = HTMLOrSVGElement> = React.KeyboardEventHandler<T> | React.MouseEventHandler<T>;

	// в некоторых контролах изменение может вызвать не одно, а несколько событий
	// для этих целей я сделал этот тип
	export type ReactUserEvent = ReactClickEvent | React.KeyboardEvent | React.FocusEvent | React.WheelEvent;

	interface AppStrictElement {
		dataset: ReactDataset;
		textContent: string;
	}

	interface ReactDataset {
		name: UXDataName;
		action: UXDataAction;
		itemId: string;
	}

	// дополняю dom типы своими
	interface ReactTarget extends ReactHtmlElement {
		readonly dataset: {[name: string]: never} & ReactDataset;
	}

	interface ReactHtmlElement extends HTMLElement {
		readonly dataset: {[name: string]: never} & ReactDataset;
	}
}

interface DataToInstance {
	// название блока html разметки (не полагаемся на css, тк он может быть модульным, а может и не быть...)
	'data-name'?: UXDataName;
	// действие элемента, которое совершается в контроле (не приложении), при клике на него
	'data-action'?: UXDataAction;
	// когда ожидается наличие многих схожих итемов в контроле (списка)
	// это используется также для делегирования событий (листенер на контейнере, а не каждом итеме)
	'data-item-id'?: string;
}

export type UXDataNameSelect =
	// должен включать в себя хидер и блок итемов
	| 'select'
	// хидер. Не должен включать в себя блок итемов. Должен иметь бордер
	| 'selectHeader'
	// итем из списка при открытии этого списка
	| 'selectItem'
	| 'selectItems'
	| 'selectItemsInner';
