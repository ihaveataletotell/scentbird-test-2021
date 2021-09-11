import * as React from 'react';
import {receiver} from 'main/mainVar';


export class DomEventBus extends React.PureComponent {
	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize = () => {
		receiver.windowResize.signal(window.innerWidth);
	}


	render(): React.ReactElement | null {
		return null;
	}
}