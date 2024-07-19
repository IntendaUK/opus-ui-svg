/* eslint-disable max-lines */

//System
import React from 'react';

//External Helpers
import { getPath, doesCollide, generateGuid } from '@intenda/opus-ui';

//Helpers
import { getAutoAnchorPoints } from './helpers';

//Generator
/* eslint-disable-next-line max-lines-per-function */
const genPathCurve = (
	props,
	config
) => {
	const { id = generateGuid(), mapName, zoom = 10 } = config;

	let [
		{ x: xa, y: ya, xNoOffset: xna, yNoOffset: yna },
		{ x: xb, y: yb, xNoOffset: xnb, yNoOffset: ynb }
	] = config.points ?? getAutoAnchorPoints(props, config);

	let dx = 0;
	let dy = 0;

	if (xa > xb)
		dx = -0;

	const from = {
		x: ~~((xa + dx) / zoom),
		y: ~~((ya + dy) / zoom)
	};

	const to = {
		x: ~~((xb - dx) / zoom),
		y: ~~((yb - dy) / zoom)
	};

	while (doesCollide(mapName, from.x, from.y, zoom)) {
		if (xa > xb)
			from.x -= zoom;
		else
			from.x += zoom;
	}

	while (doesCollide(mapName, to.x, to.y, zoom)) {
		if (xa > xb)
			to.x += zoom;
		else
			to.x -= zoom;
	}

	const points = getPath({
		mapName,
		from,
		to
	});

	points.forEach((p, i) => {
		points[i] = p * zoom;

		if (i % 2 === 0) {
			if (Math.abs(points[i] - ya) < zoom)
				points[i] = ya;
			else if (Math.abs(points[i] - yb) < zoom)
				points[i] = yb;
		} else if (i % 2 === 1) {
			if (Math.abs(points[i] - xa) < zoom)
				points[i] = xa;
			else if (Math.abs(points[i] - xb) < zoom)
				points[i] = xb;
		}
	});

	const curveArray = [];

	points.splice(0, 0, ~~yna, ~~xna);
	points.push(~~ynb, ~~xnb);

	for (let i = 0; i < points.length - 1; i += 2) {
		if (i === 0)
			curveArray.push(`M${points[i + 1]},${points[i]}`);
		else
			curveArray.push(`L${points[i + 1]},${points[i]}`);
	}

	const stroke = 'black';

	return (
		<path
			key={id}
			d={curveArray.join(' ')}
			fill='none'
			strokeWidth='2'
			stroke={stroke}
			strokeLinecap='round'
		/>
	);
};

export default genPathCurve;
