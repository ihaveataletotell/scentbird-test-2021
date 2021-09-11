import * as React from 'react';
import {ComponentUtils} from 'common/componentUtils';
import {VCWrap} from 'common/vcBranch';
import * as css from './readMore.sass';

interface ReadMoreProps extends VCProps {
	lengthThreshold?: number;
	text: string;
}

export function ReadMore(props: ReadMoreProps): React.ReactElement {
	const lengthThreshold = props.lengthThreshold || 500;

	const [isExpanded, setIsExpanded] = React.useState(false);

	const onClick = React.useCallback((e: ReactClickEvent) => {
		setIsExpanded(!isExpanded);
	}, [isExpanded]);

	const onKeyDown = React.useCallback(
		ComponentUtils.dispatchOnEnterThunk(onClick),
		[onClick],
	);

	const isLengthExceeded = props.text.length > lengthThreshold;
	const needCutText = !isExpanded && isLengthExceeded;
	const toggleText = isExpanded ? '\u00A0< Show less' : '\u00A0Read more >';

	const textBefore = needCutText
		? props.text.slice(0, lengthThreshold - 3 - toggleText.length) + '...'
		: props.text;

	return (
		<p className={props.className}>
			{textBefore}

			<VCWrap doNotRender={!isLengthExceeded}>
				<span
					className={css.readMore__toggle}
					children={toggleText}
					onClick={onClick}
					tabIndex={0}
					onKeyDown={onKeyDown}
				/>
			</VCWrap>
		</p>
	);
}