/* eslint-disable max-lines-per-function, max-lines, max-len */

//React
import React from 'react';

//External Helpers
import { getPath, doesCollide, generateGuid } from 'opus-ui';

//Generators
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

const getPoint = ({ elRect, anchor, offset }) => {
	const res = {
		xNoOffset: 0,
		yNoOffset: 0,
		x: offset.x,
		y: offset.y
	};

	if (anchor === 'left') {
		res.xNoOffset = elRect.left;
		res.yNoOffset = elRect.top + (elRect.height / 2);
	} else if (anchor === 'right') {
		res.xNoOffset = elRect.right;
		res.yNoOffset = elRect.top + (elRect.height / 2);
	} else if (anchor === 'top') {
		res.xNoOffset = elRect.left + (elRect.width / 2);
		res.yNoOffset = elRect.top;
	} else if (anchor === 'bottom') {
		res.xNoOffset = elRect.left + (elRect.width / 2);
		res.yNoOffset = elRect.bottom;
	}

	res.x += res.xNoOffset;
	res.y += res.yNoOffset;

	return res;
};

const getAnchor = ({ config: { anchorAxis }, posA, posB }) => {
	let res;

	if (anchorAxis === 'horizontal')
		res = posA.right < posB.left ? 'right' : 'left';
	else if (anchorAxis === 'vertical')
		res = posA.bottom < posB.top ? 'top' : 'bottom';

	return res;
};

const getAbsolutePosition = nodeId => {
	const node = document.getElementById(nodeId);

	let left = node.offsetLeft;
	let top = node.offsetTop;
	let parent = node.offsetParent;

	while (parent) {
		if (getComputedStyle(parent).position === 'absolute') {
			left += parent.offsetLeft;
			top += parent.offsetTop;
			break;
		} else {
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
		}
	}

	return {
		left,
		right: left + node.offsetWidth,
		top,
		bottom: top + node.offsetHeight,
		width: node.offsetWidth,
		height: node.offsetHeight
	};
};

const getAutoAnchorPoints = (props, { fromComponent, toComponent }) => {
	const { id: idA } = fromComponent;
	const { id: idB } = toComponent;

	const posA = getAbsolutePosition(idA);
	const posB = getAbsolutePosition(idB);

	const anchorA = fromComponent.anchor ?? getAnchor({
		config: fromComponent,
		posA,
		posB
	});

	const anchorB = toComponent.anchor ?? getAnchor({
		config: toComponent,
		posA: posB,
		posB: posA
	});

	const offsetA = fromComponent.pointOffset ?? fromComponent.axisOffsets?.[anchorA] ?? {
		x: 0,
		y: 0
	};

	const offsetB = toComponent.pointOffset ?? toComponent.axisOffsets?.[anchorB] ?? {
		x: 0,
		y: 0
	};

	return [
		getPoint({
			config: fromComponent,
			elRect: posA,
			anchor: anchorA,
			offset: offsetA
		}),
		getPoint({
			config: toComponent,
			elRect: posB,
			anchor: anchorB,
			offset: offsetB
		})
	];
};

const genBezierCurve = (
	props,
	config,
	setState,
	isClickHandler = false
) => {
	const { id = generateGuid(), clickData, hasArrow } = config;

	let [{ x: xa, y: ya }, { x: xb, y: yb }] = config.points ?? getAutoAnchorPoints(props, config);

	const dx = (xb - xa) / 2;
	const dy = 0;

	const x1 = xa + dx;
	const y1 = ya + dy;

	const x2 = xb - dx;
	const y2 = yb - dy;

	const curveString = `M${xa},${ya} C${x1},${y1} ${x2},${y2} ${xb},${yb}`;

	const elProps = {};
	if (isClickHandler) {
		elProps.onClick = setState.bind(null, { onClickedElements: [clickData] });
		elProps.strokeWidth = 30;
	}

	let stroke = 'black';
	if (isClickHandler)
		stroke = 'transparent';

	if (hasArrow)
		elProps.markerEnd = 'url(#arrowhead)';

	const res = (
		<path
			key={id}
			d={curveString}
			fill='none'
			strokeWidth='2'
			stroke={stroke}
			strokeLinecap='round'
			{...elProps}
		/>
	);

	return res;
};

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

const generators = {
	arrow: genArrow,
	bezierCurve: genBezierCurve,
	smoothedLine: genSmoothedLine,
	label: genLabel,
	pathCurve: genPathCurve
};

//Event
const onAddElements = (props, newState) => {
	const { setState, state: { tAddElements, elements } } = props;

	const newValue = newState.value ?? props.state.value;

	if (!tAddElements)
		return;

	if (newValue.length === 0) {
		newValue.push(
			<defs key='defs'>
				<marker
					id='arrowhead' markerWidth='10'
					markerHeight='7' refX='10'
					refY='3.5' orient='auto'>
					<path d='M0,0 L10,3.5 L0,7' style={{ fill: '#000' }} />
				</marker>
			</defs>
		);
	}

	tAddElements.forEach(t => {
		newValue.push(generators[t.type](props, t, setState));

		if (t.canClick)
			newValue.push(generators[t.type](props, t, setState, true));

		if (t.label)
			newValue.push(genLabel(props, t, setState));

		elements.push(t);
	});

	newState.value = newValue;
	newState.elements = elements;
	newState.tAddElements = false;
};

export default onAddElements;
