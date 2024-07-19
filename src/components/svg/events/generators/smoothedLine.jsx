//System
import React from 'react';

//External Helpers
import { generateGuid } from '@intenda/opus-ui';

//Generator
const genSmoothedLine = (props, { points, id = generateGuid() }) => {
	const curve = points.map((p, i) => {
		if (i === 0)
			return `M${p.x},${p.y}`;

		return `L${p.x},${p.y}`;
	});

	const res = (
		<path
			key={id}
			d={curve.join(' ')}
			fill='none'
			strokeWidth='2'
			stroke='black'
			strokeLinecap='round'
		/>
	);

	return res;
};

export default genSmoothedLine;
