import {NavLink, NavLinkProps} from 'react-router-dom';
import * as React from 'react';
import * as css from './navLinkStyled.sass';

const styledProps: Partial<NavLinkProps> = {
	activeClassName: css.link_active,
	className: css.link,
};

export const NavLinkStyled = (props: NavLinkProps): React.ReactElement => {
	return (
		<NavLink
			{...props}
			{...styledProps}
		/>
	)
}