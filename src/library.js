//Opus Lib
import { registerComponentTypes } from '@intenda/opus-ui';

//Components — re-export the wrapped component(s) so consumers can `import { Svg } from '@intenda/opus-ui-svg'`,
// the same way @intenda/opus-ui-components exposes its components.
export * from './libraryComponents';

//Components
import { Svg } from './components/svg';

//PropSpecs
import propsSvg from './components/svg/props';

registerComponentTypes([{
	type: 'svg',
	component: Svg,
	propSpec: propsSvg
}]);
