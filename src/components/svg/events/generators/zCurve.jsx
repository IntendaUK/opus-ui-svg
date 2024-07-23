//System
import React from 'react';

//External Helpers
import { generateGuid } from '@intenda/opus-ui';

//Helpers
import { getAutoAnchorPoints } from './helpers';

import genLabel from './label';

//Generator
const genSmoothedLine = (props, config) => {
	const {
		points,
		id = generateGuid(),
		deltaSize = 48,
		hasArrow,
		color = 'black',
		width = 2,
		attributes,
		label,
		labelAttributes
	} = config;

	const [{ x: xa, y: ya }, { x: xb, y: yb }] = points ?? getAutoAnchorPoints(props, config);

	const curvePoints = [{
		x: xa,
		y: ya
	}, {
		x: xb - deltaSize,
		y: ya
	}, {
		x: xb - deltaSize,
		y: yb
	}, {
		x: xb,
		y: yb
	}];

	const curveString = curvePoints.map((p, i) => {
		if (i === 0)
			return `M${p.x},${p.y}`;

		return `L${p.x},${p.y}`;
	}).join(' ');

	const elProps = {
		stroke: color,
		strokeWidth: width,
		...attributes
	};

	if (hasArrow)
		elProps.markerEnd = 'url(#arrowhead-white)';

	const builtLabel = label === undefined ? null : genLabel(props, {
		label,
		attributes: labelAttributes,
		curveString
	}, props.setState);

	const res = (
		<>
			<path
				key={id}
				d={curveString}
				fill='none'
				strokeLinecap='round'
				{...elProps}
			/>
			{builtLabel}
		</>
	);

	return res;
};

export default genSmoothedLine;
