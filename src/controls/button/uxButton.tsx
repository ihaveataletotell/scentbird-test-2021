import * as React from 'react';
import cn from 'classnames';
import * as css from './uxButton.sass'

interface UXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export function UXButton(props: UXButtonProps): React.ReactElement {
    return (
        <button
          {...props}
          className={cn(props.className, css.button)}
        />
    );
}