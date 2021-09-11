import {NavLink, NavLinkProps, Link, LinkProps} from 'react-router-dom';
import * as React from 'react';
import cn from 'classnames';
import * as css from './navLinkStyled.sass';

const styledProps: Partial<NavLinkProps> = {
	activeClassName: css.link_active,
	className: css.link,
};

export const NavLinkStyled = (props: NavLinkProps): React.ReactElement => {
	return (
		<NavLink
			{...styledProps}
			{...props}
		/>
	)
}

export const LinkStyled = (props: LinkProps): React.ReactElement => {
	return (
		<Link
			className={cn(props.className, styledProps.className)}
			{...props}
		/>
	)
}