export type LinearFuncFactors = {
	x: number;
	y: number;
};

export type MinMaxSize = {
	minWidth: number;
	maxWidth: number;
};

declare global {
	interface Window {
		calc?(elSize: MinMaxSize, windowSize: MinMaxSize, scrollbarOffset: number): string;
	}
}

// Функция для получения адаптированной css ширины элемента в пределах заданных размеров окна
// Используется для верстки в консоли
window.calc = (elemSize: MinMaxSize, windowSize: MinMaxSize): string => {
	const factors = LinearFnLayout.calcLinearFunc(elemSize, windowSize);
	return LinearFnLayout.getCssWidth(factors);
};

class LinearFnLayout {
	// вот через эту функцию я и получаю размеры элементов в css
	static getCssWidth(linearFunc: LinearFuncFactors): string {
		return `calc(${linearFunc.x}vw + ${linearFunc.y}px)`;
	}

	// Функция подсчитывает коэффициенты линейной функции изменения ширины элемента относительно ширины экрана
	static calcLinearFunc(elemSize: MinMaxSize, windowSize: MinMaxSize): LinearFuncFactors {
		// вывод {x,y} из системы уравнений
		// elemSize.minWidth = x * windowSize.minWidth + y
		// elemSize.maxWidth = x * windowSize.maxWidth + y

		const x = Math.round(
			(elemSize.maxWidth - elemSize.minWidth) / (windowSize.maxWidth - windowSize.minWidth) * 1000 * 100
		) / 1000;
		const y = Math.round((elemSize.minWidth - x * windowSize.minWidth / 100) * 1000) / 1000;

		return {x, y};
	}
}