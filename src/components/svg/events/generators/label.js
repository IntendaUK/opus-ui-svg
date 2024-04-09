//System
import React from 'react';

//External Helpers
import { generateGuid } from '@intenda/opus-ui';

//Generator
const genLabel = (props, { points, label, idLabel = generateGuid(), clickData }, setState) => {
	const [{ x: x1, y: y1 }, { x: x4, y: y4 }] = points;

	const dx = (x4 - x1) / 2;
	const dy = 0;

	const x2 = x1 + dx;
	const y2 = y1 + dy;

	const x3 = x4 - dx;
	const y3 = y4 - dy;

	const onClick = setState.bind(null, { onClickedElements: [clickData] });

	const percentage = '50%';

	return (
		<text
			key={idLabel}
			dy='-0.5%' textAnchor='middle'
			fontSize={25}
			onClick={onClick}
		>
			<textPath xlinkHref={`#${idLabel}-path`} startOffset={percentage}>
				{label}
			</textPath>
			<defs>
				<path
					id={idLabel + '-path'}
					d={`M${x1},${y1} C${x2},${y2} ${x3},${y3} ${x4},${y4}`}
				/>
			</defs>
		</text>
	);
};

export default genLabel;
