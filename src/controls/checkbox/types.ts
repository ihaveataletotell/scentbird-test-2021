export interface UXAbstractCheckboxProps extends UXCheckboxSharedProps {
	VC?: React.ComponentType<UXCheckboxVCProps>;
	onChange?(e: ReactClickEvent, isChecked: boolean): void;
}

export interface UXCheckboxSharedProps extends UXBasicVCProps {
	isChecked?: boolean;
	name?: string;
	onBlur?(e: React.FocusEvent): void;
}

export interface UXCheckboxVCProps extends UXMapToVCProps<UXCheckboxSharedProps> {
	onClick(e: ReactClickEvent): void;
}