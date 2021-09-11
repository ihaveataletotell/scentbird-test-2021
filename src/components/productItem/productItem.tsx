import * as React from 'react';
import cn from 'classnames';
import {StarsRatingAndText} from 'components/productItem/starIcon';
import {LinkStyled} from 'smallComponents/navLinkStyled';
import {cssUtility} from 'common/cssHelper';
import {IssueKindBadge, IssueKindSelected} from 'components/productItem/issueKindBadge';
import {UXButton} from 'controls/button/uxButton';
import * as css from './productItem.sass';
import {ReadMore} from 'components/readMore';
import {UXTabsSwitch, UXTabsSwitchVC} from 'controls/tabs/uxTabs';
import {UXTabsItem} from 'controls/tabs/types';

interface ProductItemProps {
	data: DM.Product.Data;
}

export const ProductItem = React.memo(
	function ProductItem(props: ProductItemProps) {
		return (
			<div className={css.productItem}>
				<ProductItemHeader
					className={css.productItem__header}
					data={props.data}
				/>

				<ProductItemRating
					className={css.productItem__rating}
					data={props.data}
				/>

				<ProductItemPreviewAndSelect
					data={props.data}
				/>

				<ProductItemDescription
					data={props.data}
				/>
			</div>
		)
	}
);

interface ProductItemHeaderProps extends VCWithClass {
	data: DM.Product.Data;
}

function ProductItemHeader(props: ProductItemHeaderProps): React.ReactElement {
	return (
		<div className={cn(props.className, css.header, cssUtility.flexColCenter)}>
			<h2
				children={props.data.nameOfMaker}
			/>

			<h2
				className={css.header_lightText}
				children={props.data.name}
			/>

			<div
				className={css.header_lightText}
				children={props.data.category}
			/>
		</div>
	);
}

interface ProductItemRatingProps extends VCProps {
	data: DM.Product.Data;
}

function ProductItemRating(props: ProductItemRatingProps): React.ReactElement {
	const {data: {reviews}} = props;

	const avgRating = React.useMemo(() => {
		if (!reviews.length) return 0;
		return reviews.reduce<number>((acc, x) => acc + x.rating, 0) / reviews.length;
	}, [reviews]);

	return (
		<div
			className={cn(cssUtility.flexColCenter, props.className)}
		>

			<div className={css.rating__title}>
				<h4 children={'AVERAGE RATING'} />

				<LinkStyled
					to={'#hehmda'}
					children={`(${reviews.length} reviews)`}
				/>
			</div>

			<StarsRatingAndText
				ratingValue={avgRating}
				ratingMax={5}
				className={css.rating__stars}
			/>

		</div>
);
}

interface ProductItemSelectProps extends VCProps {
	data: DM.Product.Data;
}

function ProductItemPreviewAndSelect(props: ProductItemSelectProps): React.ReactElement {
	const [activeId, setActiveId] = React.useState(props.data.issueKinds[0]?.id);

	const onSelect = React.useCallback((e: ReactClickEvent, data: DM.Product.IssueKind) => {
		setActiveId(data.id);
	}, []);

	const selectedData = React.useMemo(() => {
		return props.data.issueKinds.find(x => x.id == activeId);
	}, [activeId, props.data.issueKinds]);

	return (
		<div className={cn(props.className, css.preview)}>
			<ProductItemPreview
				data={selectedData}
				gender={props.data.gender}
				productName={`${props.data.name} ${props.data.category}`}
			/>

			<hr className={css.preview__hr} />

			<IssueKindSelected
				data={selectedData}
				className={css.preview__selectedBadge}
			/>

			<UXButton
				children={'Add to Queue'}
				className={css.preview__button}
				onClick={() => console.log('heh mda')}
			/>

			<div className={css.preview__badges}>
				{props.data.issueKinds.map(x => {
					return (
						<IssueKindBadge
							className={css.preview__singleBadge}
							data={x}
							isActive={activeId == x.id}
							key={x.id}
							onSelect={onSelect}
						/>
					)
				})}
			</div>
		</div>
	);
}

interface ProductItemPreviewProps {
	data: DM.Product.IssueKind | undefined;
	productName: string;
	gender: DM.Product.Gender;
}

const getIconFaClassByGender = (gender: DM.Product.Gender): string => {
	switch (gender) {
		case 'female': return cssUtility.faVenus;
		case 'male': return cssUtility.faMars;

		case 'uni':
		default: return cssUtility.faVenusMars;
	}
}

function ProductItemPreview(props: ProductItemPreviewProps): React.ReactElement | null {
	if (!props.data) return null;

	return (
		<div className={css.preview__imageBox}>
			<img
				src={props.data.previewUrl}
				alt={props.productName}
				className={css.preview__imageBoxImage}
			/>

			{/* тут не нашел других иконок, а при экспорте это один path, а так можно было бы поддержать по данным */}
			<div
				className={css.preview__imageBoxGender}
			>
				<div
					className={cn(
						cssUtility.fa,
						getIconFaClassByGender(props.gender),
					)}
				/>
			</div>
		</div>
	);
}

interface ProductItemDescriptionProps extends VCProps {
	data: DM.Product.Data;
}

type TabsIdProduct = 'howItWorks' | 'ingredients';

const tabItems: UXTabsItem<TabsIdProduct>[] = [
	{caption: 'How it works', id: 'howItWorks'},
	{caption: 'Ingredients', id: 'ingredients'},
];

function ProductItemDescription(props: ProductItemDescriptionProps): React.ReactElement {
	const onRenderTabContent = (data: UXTabsItem<TabsIdProduct>): React.ReactElement | null => {
		if (data.id == 'howItWorks') return <>{props.data.howItWorks}</>;
		if (data.id == 'ingredients') return <>{props.data.ingredients}</>;
		return null;
	}

	return (
		<div className={cn(props.className, css.description)}>
			<h3
				children={'Description'}
				className={css.description__header}
			/>

			<ReadMore
				text={props.data.description}
				className={css.description__readMore}
			/>

			<UXTabsSwitch
				items={tabItems}
				onRenderActiveTabContent={onRenderTabContent}
			/>
		</div>
	);
}