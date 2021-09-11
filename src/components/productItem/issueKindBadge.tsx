import * as React from 'react';
import cn from 'classnames';
import {MediaMatcher} from 'classes/mediaMatcher';
import {cssUtility} from 'common/cssHelper';
import * as css from './issueKindBadge.sass';
import {ComponentUtils} from 'common/componentUtils';

interface IssueKindBadgeProps extends VCProps, IssueKindBadgeBasicProps {
	isActive: boolean;
	onSelect(e: ReactClickEvent, data: DM.Product.IssueKind): void;
}

interface IssueKindBadgeBasicProps extends VCProps {
	data: DM.Product.IssueKind | undefined;
}

const getIssueKindData = (data: DM.Product.IssueKind, isLarge = !MediaMatcher.isMobileOrTabletPortrait) => {
	const paymentTypeTextSmall = textByIssuePaymentType(data.paymentType, false);
	const paymentTypeTextLarge = textByIssuePaymentType(data.paymentType, true);
	const paymentsTypeTextByMedia = isLarge ? paymentTypeTextLarge : paymentTypeTextSmall;
	const imgAlt = `${data.productSize} ${paymentTypeTextLarge}`;

	return {
		isLarge,
		paymentTypeTextSmall,
		paymentTypeTextLarge,
		paymentsTypeTextByMedia,
		imgAlt,
	}
}

export function IssueKindSelected(props: IssueKindBadgeBasicProps): React.ReactElement | null {
	if (!props.data) return null;

	const calcData = getIssueKindData(props.data);
	const text1 = `${calcData.paymentsTypeTextByMedia} price: `;
	const text2 = `Size: `;
	const price = (props.data.productPrice / 100).toFixed(2);

	return (
		<div
			className={cn(
				props.className,
				css.selectedBadge,
				cssUtility.flexStartCenter,
			)}
		>
			<img
				className={css.selectedBadge__preview}
				src={props.data.previewUrl}
				alt={calcData.imgAlt}
				title={calcData.imgAlt}
			/>

			<div className={css.selectedBadge__text}>
				<div>
					{text1} <b children={'$' + price} />
				</div>

				<div>
					{text2} <b children={props.data.productSize} />
				</div>
			</div>
		</div>
	);
}

export function IssueKindBadge(props: IssueKindBadgeProps): React.ReactElement | null {
	if (!props.data) return null;

	const onClick = React.useCallback((e: ReactClickEvent) => {
		props.onSelect(e, props.data!);
	}, [props.data]);

	const onKeyDown = React.useCallback(
		ComponentUtils.dispatchOnEnterThunk(onClick),
		[onClick],
	);

	const calcData = getIssueKindData(props.data);

	return (
		<div
			tabIndex={0}
			className={cn(
				props.className,
				css.issueBadge,
				cssUtility.flexStartCenter,
				props.isActive && css.issueBadge_active,
			)}
			onClick={onClick}
			onKeyDown={onKeyDown}
		>
			<img
				className={css.issueBadge__preview}
				src={props.data.previewUrl}
				alt={calcData.imgAlt}
				title={calcData.imgAlt}
			/>

			<div
				className={cn(css.issueBadge__text, calcData.isLarge && css.issueBadge__text_large)}
			>
				<div children={props.data.productSize} />

				<div children={calcData.paymentsTypeTextByMedia} />
			</div>
		</div>
	);
}

const textByIssuePaymentType = (type: DM.Product.IssuePaymentType, isLarge: boolean): string | null => {
	if (type == 'subscription') return 'Subscription';

	if (type == 'onetime') {
		if (isLarge) return 'One-time purchase';
		return 'One-time';
	}

	return null;
}
