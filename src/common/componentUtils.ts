
type WeakCallbackType<T> = (e: ReactClickEvent<T>) => void;

type AppHtmlGenericMap = {
	'item-id': string;
	action: UXDataAction;
	name: UXDataName;
}

type AppHtmlGeneric = keyof AppHtmlGenericMap;

export const matchesSafe = (element: Element, selector: string): boolean => {
	const searchElement = element?.parentElement || document;
	const allMatches = searchElement.querySelectorAll(selector);
	return Array.prototype.some.call(allMatches, (e: Element) => e == element);
};

/**
 * Функция находит ближайший родительский элемент, удовлетворяющий селектору
 * @param node - нода, с которой начинается поиск
 * @param selector - селектор родительского элемента
 * @return
 */
export const closestSafe = <T extends HTMLElement = HTMLElement>(node: Node, selector: string): T | null  => {
	while (node) {
		if (node.nodeType == Node.ELEMENT_NODE && matchesSafe(node as Element, selector)) {
			return node as T;
		} else {
			node = node.parentNode!;
		}
	}

	return null;
};

/**
 * если работаем с Node-родителем, у него может не быть метода .contains
 * Поэтому безопаснее использовать функцию
 * @param parent
 * @param child
 */
export const containsSafe = (parent: Node, child: Node): boolean => {
	if (!parent) return false;

	while (child) {
		if (child == parent) return true;
		child = child.parentNode!;
	}

	return false;
};

export class ComponentUtils {
	static isCommandKeyPressed(e?: React.KeyboardEvent<HTMLOrSVGElement>): boolean {
		if (!e) return false;
		if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return true;

		return false;
	}

	static dispatchOnKeyThunk<T>(
		key: string, callback?: WeakCallbackType<T>, stopPropagation?: boolean,
	): React.KeyboardEventHandler<HTMLOrSVGElement> {

		return (e: React.KeyboardEvent<HTMLOrSVGElement>): void => {
			if (this.isCommandKeyPressed(e)) return;

			if (e.key == key) {
				callback?.(e as unknown as ReactClickEvent<T>);

				if (stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
		};
	}

	static dispatchOnEnterThunk<T>(
		callback?: WeakCallbackType<T>, stopPropagation?: boolean,
	): React.KeyboardEventHandler<HTMLOrSVGElement> {
		return this.dispatchOnKeyThunk('Enter', callback, stopPropagation);
	}
}

export class UXUtils {
	static getDataNameEl(e: ReactClickEvent, value?: UXDataName): AppStrictElement | undefined {
		return this.getAppHtmlElement(e, 'name', value);
	}

	static getAppHtmlElement<T extends AppHtmlGeneric>(e: ReactClickEvent, by: T, value?: AppHtmlGenericMap[T]): AppStrictElement | undefined {
		const target = e.target as HTMLElement;
		const currentTarget = e.currentTarget as HTMLElement;

		const selector = UXUtils.getDataSelector(by, value);
		const closest = closestSafe<ReactHtmlElement>(target, selector);

		if (!closest || !containsSafe(currentTarget, closest)) return;

		return closest as AppStrictElement;
	}

	static getDataSelector<T extends AppHtmlGeneric>(by: T, value?: AppHtmlGenericMap[T]): string {
		// ищем с атрибутом с непустым значением
		const selector = value
			? `[data-${by}="${value}"]`
			: `[data-${by}]:not([data-${by}=""])`;

		return selector;
	}
}