import * as React from 'react';

export function VCWrap(props: VCWrapProps): React.ReactElement | null {
	if (props.doNotRender) return props.fallback || null;
	return <>{props.children}</>;
}

// VisualComponent
export const VC = React.memo(
	function VC(props: VCStyledProps): React.ReactElement {
		return (
			<div
				children={props.children}
				className={props.className}
				data-action={props.datasetAction}
				data-item-id={props.datasetItemId}
				data-name={props.datasetName}
				style={props.style}
			/>
		);
	}
);

export const VCIfHasChildren = function VCIfChildren(props: VCStyledProps): React.ReactElement | null {
	if (!props.children) return null;
	return <VC {...props} />;
};

export const VCIf = React.memo(
	function VCIf(props: VCIfProps): React.ReactElement {
		if (props.if) return props.children[0];
		return props.children[1];
	}
);

export const ExtendedVC = React.memo(
	function ExtendedVC(props: ExtendedVCProps): React.ReactElement | null {
		if (props.doNotRender) return props.fallback || null;
		const Component: any = (props.tagname || 'div');

		return (
			<Component
				children={props.children}
				className={props.className}
				data-action={props.datasetAction}
				data-item-id={props.datasetItemId}
				data-name={props.datasetName}
				onClick={props.onClick}
				onKeyPress={props.onKeyPress}
				ref={props.rootRef}
				style={props.style}
				tabIndex={props.tabIndex}
				title={props.title}
			/>
		);
	}
);
ExtendedVC.displayName = 'ExtendedVC';

export interface VCStyledProps extends VCProps, VCWithData {
	style?: React.CSSProperties;
}

export interface VCFullProps extends VCWrapProps, VCStyledProps {}

export interface ExtendedVCProps<T extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> extends VCFullProps {
	onClick?(e: ReactClickEvent): void;
	onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
	// Пытался связать тэг с типом ссылки - не вышло
	rootRef?: React.Ref<HTMLElement>;
	tagname?: T;
	tabIndex?: string | number;
	title?: string;
}