import { h, Component } from 'preact';
import style from './style';

import Gameplay from '../../components/Gameplay';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Gameplay/>
			</div>
		);
	}
}
