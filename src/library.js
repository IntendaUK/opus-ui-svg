//Components
import { Svg } from './components/svg';

//PropSpecs
import propsSvg from './components/svg/props';

import { registerComponentTypes } from '@intenda/opus-ui';

registerComponentTypes([{
	type: 'svg',
	component: Svg,
	propSpec: propsSvg
}]);
