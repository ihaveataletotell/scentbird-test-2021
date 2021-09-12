import * as React from 'react';
import cn from 'classnames';
import {UXEditWithLabel} from 'controls/edit/uxEdit';
import {UXButton} from 'controls/button/uxButton';
import {LinkStyled} from 'smallComponents/navLinkStyled';
import {UXCheckbox} from 'controls/checkbox/uxCheckbox';
import {useFormik} from 'formik';
import {ExtendedVC, VCWrap} from 'common/vcBranch';
import {cssUtility} from 'common/cssHelper';
import {UXDropdown} from 'controls/dropdown/uxDropdown';
import {IUXDropdownItem} from 'controls/dropdown/types';
import * as css from './shippingAddressForm.sass';
import {receiverRoutes} from 'main/mainVarUsers';

interface ShippingAddressFormProps {}

interface FormValues extends BasicFormValues {
	telephone?: string;
	useAsBillingAddress?: boolean;
}

interface BasicFormValues {
	appOrSuite: string;
	city1: string;
	city2: string;
	country: string;
	firstName: string;
	lastName: string;
	postcode: string;
	streetName: string;
}

const cityItemsHardcoded: IUXDropdownItem[] = [
	{caption: 'New York', id: '1'},
	{caption: 'Los Angeles', id: '2'},
	{caption: 'San Francisco', id: '3'},
	{caption: 'San Diego', id: '4'},
];

const getInitialValues = (): BasicFormValues => {
	return {
		appOrSuite: '',
		city1: '1',
		city2: '1',
		country: 'UNITED STATES',
		firstName: '',
		lastName: '',
		postcode: '100095',
		streetName: '',
	};
}

const validate = (values: FormValues) => {
	const errors: {[K in keyof FormValues]?: string} = {};

	// полагаем под буквами только английские буквы
	// допустим наше апи не принимает эти данные на русском
	if (!values.firstName) {
		errors.firstName = 'This field is required';
	} else if (!/^[a-z]+$/i.test(values.firstName)) {
		errors.firstName = 'Only letters are allowed';
	}

	if (!values.lastName) {
		errors.lastName = 'This field is required';
	} else if (!/^[a-z]+$/i.test(values.lastName)) {
		errors.lastName = 'Only letters are allowed';
	}

	if (!values.streetName) {
		errors.streetName = 'This field is required';
	} else if (!/^[a-z0-9-\s]+$/i.test(values.lastName) || !values.lastName.trim()) {
		errors.streetName = 'Only letters, numbers, spaces and dashes are allowed';
	}

	if (!values.country || !values.country.trim()) {
		errors.country = 'This field is required';
	}

	if (!values.postcode || !values.postcode.trim()) {
		errors.postcode = 'This field is required';
	}

	return errors;
};

// не понял как в этот библе по другому получить типизированый return с учетом generic'a
// кто-то ленивый типы писал, можно же было интерфейс сделать...
const dontCallMePlease = () => useFormik<FormValues>({} as any);
type FormikAddressForm = ReturnType<typeof dontCallMePlease>;

export function ShippingAddressForm(props: ShippingAddressFormProps): React.ReactElement {
	const formikBilling = useFormik<FormValues>({
		initialValues: getInitialValues(),
		validate,
		onSubmit: () => void 0,
	});

	const formikShipping = useFormik<FormValues>({
		initialValues: {
			...getInitialValues(),
			telephone: '',
			useAsBillingAddress: true,
		},
		validate,
		onSubmit: async (values) => {
			if (values.useAsBillingAddress) {
				console.log({shipping: values, billing: values});
				return;
			}

			if (!formikBilling.isValid) return;
			console.log({shipping: formikShipping.values, billing: formikBilling.values})
		},
	});

	const onComposedSubmit = React.useCallback(async () => {
		if (!formikShipping.values.useAsBillingAddress) {
			await formikBilling.submitForm();
		}

		await formikShipping.submitForm();

	}, [formikShipping.values, formikShipping.submitForm, formikBilling.submitForm]);

	// ранее спроектировал чекбокс без инпута, не знаю как лучше выкрутиться в данной ситуации
	const onChangeCheckbox = React.useCallback((e, isChecked: boolean) => {
		formikShipping.setFieldValue('useAsBillingAddress', isChecked)
	}, [formikShipping.setFieldValue]);

	// данными манипуляциями сделал, чтобы обновлялась только редактируемая форма при изменении, но не другая
	const checkboxJsx = React.useMemo(() => {
		return (
			<UXCheckbox
				isChecked={!!formikShipping.values.useAsBillingAddress}
				onChange={onChangeCheckbox}
				name={'useAsBillingAddress'}
			>
				<div
					children={'Use this address as my billing address'}
					className={css.form__checkboxText}
				/>
			</UXCheckbox>
		)
	}, [onChangeCheckbox, formikShipping.values.useAsBillingAddress]);

	return (
		<div className={css.formPage}>
			<div className={css.formPage__form}>

				<AbstractAddressForm
					formik={formikShipping}
					hasNoPhoneField={false}
					slotHeader={'Shipping address'}
				>
					{checkboxJsx}
				</AbstractAddressForm>

				<AbstractAddressForm
					doNotRender={formikShipping.values.useAsBillingAddress}
					formik={formikBilling}
					hasNoPhoneField
					slotHeader={'Billing address'}
				/>

				<div className={css.formPage__nav}>
					<UXButton
						className={css.formPage__btn}
						onClick={onComposedSubmit}
						type={'submit'}
					>
						{'Buy now'}

						<div
							className={cn(cssUtility.fa, cssUtility.faArrowRight)}
						/>
					</UXButton>

					<LinkStyled
						children={'Back'}
						className={css.formPage__back}
						to={receiverRoutes.prevRoute || ''}
					/>
				</div>
			</div>
		</div>
	);
}

interface AbstractAddressFormProps extends VCProps, VCWrapProps {
	hasNoPhoneField: boolean;
	slotHeader: React.ReactNode;
	formik: FormikAddressForm;
}

// IMPORTANT custom React.memo propsAreEqual fn is defined
const AbstractAddressForm = React.memo(
	function AbstractAddressForm(props: AbstractAddressFormProps): React.ReactElement | null {
		if (props.doNotRender) return null;
		const formik = props.formik;

		return (
			<form className={cn(css.form, css.formPage__form)}>
				<ExtendedVC
					children={props.slotHeader}
					className={css.form__header}
					doNotRender={!props.slotHeader}
					tagname={'h2'}
				/>

				<div className={css.form__nameRow}>
					<UXEditWithLabel
						autoComplete={'given-name'}
						errorMessage={formik.touched.firstName ? formik.errors.firstName : undefined}
						name={'firstName'}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder={'First Name'}
						value={formik.values.firstName}
					/>

					<UXEditWithLabel
						autoComplete={'family-name'}
						errorMessage={formik.touched.lastName ? formik.errors.lastName : undefined}
						name={'lastName'}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder={'Last Name'}
						value={formik.values.lastName}
					/>
				</div>

				<div className={css.form__addressRow}>
					<UXEditWithLabel
						autoComplete={'street-address'}
						errorMessage={formik.touched.streetName ? formik.errors.streetName : undefined}
						name={'streetName'}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder={'Street Name'}
						value={formik.values.streetName}
					/>

					<UXEditWithLabel
						autoComplete={'house'}
						name={'appOrSuite'}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						placeholder={'App/Suite (Optional)'}
						value={formik.values.appOrSuite}
					/>
				</div>

				<div className={css.form__postcodeRow}>
					<UXEditWithLabel
						autoComplete={'postal-code'}
						name={'postcode'}
						onBlur={formik.handleBlur}
						errorMessage={formik.touched.postcode ? formik.errors.postcode : undefined}
						onChange={formik.handleChange}
						placeholder={'Postcode'}
						value={formik.values.postcode}
					/>

					<UXDropdown
						className={css.form__postcodeSelect}
						items={cityItemsHardcoded}
						onChange={(e, selectedId) => formik.setFieldValue('city1', selectedId)}
						value={formik.values.city1}
					/>

					<UXDropdown
						className={css.form__postcodeSelect}
						items={cityItemsHardcoded}
						onChange={(e, selectedId) => formik.setFieldValue('city2', selectedId)}
						value={formik.values.city2}
					/>
				</div>

				<UXEditWithLabel
					autoComplete={'country-name'}
					className={css.form__country}
					errorMessage={formik.touched.country ? formik.errors.country : undefined}
					name={'country'}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					placeholder={'Country'}
					value={formik.values.country}
				/>

				<VCWrap doNotRender={props.hasNoPhoneField}>
					<div className={css.form__telRow}>
						<UXEditWithLabel
							autoComplete={'tel'}
							className={css.form__telEdit}
							name={'telephone'}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							placeholder={'Phone number (Optional)'}
							value={formik.values.telephone}
						/>

						<div
							className={css.form__telText}
							children={'We may send you special discounts and offers'}
						/>
					</div>
				</VCWrap>

				{props.children}
			</form>
		);
	},
	(prevProps, nextProps) => {
		return (
			// формик зачем-то делает новую ссылку на объект при вызове хука
			// ну ладно, наконец-то придется написать свою функцию сравнения за долгое время
			prevProps.formik.values == nextProps.formik.values
			&& prevProps.formik.errors == nextProps.formik.errors
			&& prevProps.formik.touched == nextProps.formik.touched
			&& prevProps.formik.handleChange == nextProps.formik.handleChange
			&& prevProps.doNotRender == nextProps.doNotRender
			&& prevProps.children == nextProps.children
		)
	},
);