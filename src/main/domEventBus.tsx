import * as React from 'react';
import {receiverResize} from 'main/mainVarUsers';

export class DomEventBus extends React.PureComponent {
	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize = () => {
		receiverResize.signal(window.innerWidth);
	}


	render(): React.ReactElement | null {
		return null;
	}
}