import * as React from 'react';
import {useEffect} from 'react';
import cn from 'classnames';
import {StarsRatingAndText} from 'components/productItem/starIcon';
import {LinkStyled} from 'smallComponents/navLinkStyled';
import {cssUtility} from 'common/cssHelper';
import {IssueKindBadge, IssueKindSelected} from 'components/productItem/issueKindBadge';
import {UXButton} from 'controls/button/uxButton';
import {ReadMore} from 'components/readMore';
import {UXTabsSwitch} from 'controls/tabs/uxTabs';
import {UXTabsItem} from 'controls/tabs/types';
import {LazyReceiver} from 'classes/notifier';
import {HookCore} from 'classes/hookCore';
import {ScreenWidth} from 'classes/mediaMatcher';
import {receiverMediaMatcher} from 'main/mainVarUsers';
import * as css from './productItem.sass';

interface ProductItemProps {
	data: DM.Product.Data;
}

const activeIssueIdReceiver = new LazyReceiver<string | undefined>();

interface ProductItemPreviewWrapProps extends VCWrapProps {
	data: DM.Product.Data;
	place: 'col1' | 'col2';
}

const ProductItemPreviewWrap = (props: ProductItemPreviewWrapProps): React.ReactElement | null => {
	const [activeId] = HookCore.useReceiver(activeIssueIdReceiver);
	const [screenWidth] = HookCore.useReceiver(receiverMediaMatcher);

	const selectedData = React.useMemo(() => {
		return props.data.issueKinds.find(x => x.id == activeId);
	}, [activeId, props.data.issueKinds]);

	if (
		!screenWidth
		|| props.place == 'col1' && screenWidth < ScreenWidth.tabletLandscape
		|| props.place == 'col2' && screenWidth >= ScreenWidth.tabletLandscape
	) return null;

	if (props.doNotRender) return null;

	return (
		<ProductItemPreview
			data={selectedData}
			gender={props.data.gender}
			productName={`${props.data.name} ${props.data.category}`}
		/>
	);
}

export const ProductItem = React.memo(
	function ProductItem(props: ProductItemProps) {
		useEffect(() => {
			activeIssueIdReceiver.signal(props.data.issueKinds[0]?.id);
		}, [props.data.id]);

		return (
			<div className={css.productItem}>
				<div
					className={css.productItem__col1}
				>
					<ProductItemPreviewWrap
						data={props.data}
						place={'col1'}
					/>
				</div>

				<div className={css.productItem__col2}>
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
				className={cn(css.header_lightText, css.header_bottomText)}
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
	const [activeId, setActiveId] = HookCore.useReceiver(activeIssueIdReceiver);
	HookCore.useReceiver(receiverMediaMatcher);

	const onSelect = React.useCallback((e: ReactClickEvent, data: DM.Product.IssueKind) => {
		setActiveId(data.id);
	}, []);

	const selectedData = React.useMemo(() => {
		return props.data.issueKinds.find(x => x.id == activeId);
	}, [activeId, props.data.issueKinds]);

	return (
		<div className={cn(props.className, css.preview)}>
			<ProductItemPreviewWrap
				data={props.data}
				place={'col2'}
			/>

			<hr className={css.preview__hr} />

			<div className={css.preview__selectedWithButton}>
				<IssueKindSelected
					data={selectedData}
					longCaptionMode={receiverMediaMatcher.hasWideCol2}
					className={css.preview__selectedBadge}
				/>

				<UXButton
					children={'Add to Queue'}
					className={css.preview__button}
					onClick={() => console.log('heh mda')}
				/>
			</div>

			<div className={css.preview__badges}>
				{props.data.issueKinds.map(x => {
					return (
						<IssueKindBadge
							className={css.preview__singleBadge}
							data={x}
							isActive={activeId == x.id}
							key={x.id}
							longCaptionMode={receiverMediaMatcher.hasWideCol2}
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
		if (data.id == 'howItWorks') return <p>{props.data.howItWorks}</p>;
		if (data.id == 'ingredients') return <p>{props.data.ingredients}</p>;
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