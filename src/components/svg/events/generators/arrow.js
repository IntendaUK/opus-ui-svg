//System
import React from 'react';

//External Helpers
import { generateGuid } from '@intenda/opus-ui';

//Generator
const genArrow = (props, { x, y, direction = 'right', id = generateGuid() }) => {
	const triangleWidth = 20;
	const triangleHeight = 10;
	const pointY = y - triangleHeight / 2;

	let vertex1 = `${x},${pointY}`;
	let vertex2 = `${x + triangleWidth},${y}`;
	let vertex3 = `${x},${y + triangleHeight / 2}`;

	if (direction === 'left') {
		vertex1 = `${x + triangleWidth},${pointY}`;
		vertex2 = `${x + triangleWidth},${y + triangleHeight / 2}`;
		vertex3 = `${x},${y}`;
	}

	const res = (
		<polygon
			key={id}
			fill='black'
			points={`${vertex1} ${vertex2} ${vertex3}`}
		/>
	);

	return res;
};

export default genArrow;
