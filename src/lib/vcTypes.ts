import * as React from 'react';

export interface ThisFileHasExport {}

declare global {
	interface VCDataItemId {
		datasetItemId: string;
	}

	interface VCDataName {
		datasetName: UXDataName;
	}

	interface VCDataAction {
		datasetAction: UXDataAction;
	}

	interface VCWithData extends Partial<VCDataName & VCDataItemId & VCDataAction> {}

	interface VCWithDoNotRender {
		doNotRender?: boolean;
	}

	interface VCWithRootRef<T> {
		rootRef?: React.RefObject<T>;
	}

	interface VCWithStyle {
		style?: React.CSSProperties;
	}

	interface VCWithClass {
		className?: string;
	}

	interface VCWithSlot<T = React.ReactNode> {
		children?: T;
	}

	interface VCIfProps {
		children: [React.ReactElement, React.ReactElement];
		if: boolean;
	}

	interface VCWrapProps extends VCWithDoNotRender, VCWithSlot {
		fallback?: JSX.Element;
	}

	interface VCProps extends VCWithClass, VCWithSlot {}
}