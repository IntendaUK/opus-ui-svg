//System
import React, { Fragment } from 'react';

//External Helpers
import { generateGuid } from '@intenda/opus-ui';

//Helpers
import { getAutoAnchorPoints } from './helpers';

import genLabel from './label';

//Generator
/* eslint-disable-next-line max-lines-per-function */
const genBezierCurve = (
	props,
	config,
	setState,
	isClickHandler = false
) => {
	const {
		id = generateGuid(),
		clickData,
		hasArrow,
		color = 'black',
		width = 2,
		attributes,
		label,
		labelAttributes
	} = config;

	let [{ x: xa, y: ya }, { x: xb, y: yb }] = config.points ?? getAutoAnchorPoints(props, config);

	const dx = (xb - xa) / 2;
	const dy = 0;

	const x1 = xa + dx;
	const y1 = ya + dy;

	const x2 = xb - dx;
	const y2 = yb - dy;

	const curveString = `M${xa},${ya} C${x1},${y1} ${x2},${y2} ${xb},${yb}`;

	const elProps = {
		stroke: color,
		strokeWidth: width,
		...attributes
	};

	if (isClickHandler) {
		elProps.onClick = setState.bind(null, { onClickedElements: [clickData] });
		elProps.strokeWidth = 30;
	}

	if (isClickHandler)
		elProps.stroke = 'transparent';

	if (hasArrow)
		elProps.markerEnd = 'url(#arrowhead)';

	const builtLabel = label === undefined ? null : genLabel(props, {
		label,
		clickData,
		attributes: labelAttributes,
		curveString
	}, props.setState);

	const res = (
		<Fragment key={`${id}-frag`}>
			<path
				key={id}
				d={curveString}
				fill='none'
				strokeLinecap='round'
				{...elProps}
			/>
			{builtLabel}
		</Fragment>
	);

	return res;
};

export default genBezierCurve;
