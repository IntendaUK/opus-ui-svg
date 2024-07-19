/* eslint-disable max-lines-per-function, max-lines, max-len */

//React
import React, { cloneElement } from 'react';

//Generators
import genArrow from './generators/arrow';
import genLabel from './generators/label';
import genSmoothedLine from './generators/smoothedLine';
import genBezierCurve from './generators/bezierCurve';
import genPathCurve from './generators/pathCurve';

const generators = {
	arrow: genArrow,
	bezierCurve: genBezierCurve,
	smoothedLine: genSmoothedLine,
	label: genLabel,
	pathCurve: genPathCurve
};

//Event
const onAddElements = (props, newState) => {
	const { setState, state: { tAddElements, elements, elementAttributeOverrides } } = props;

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
		let builtElement = generators[t.type](props, t, setState);

		if (t.canClick)
			newValue.push(generators[t.type](props, t, setState, true));

		if (t.label)
			newValue.push(genLabel(props, t, setState));

		const overrideAttributes = elementAttributeOverrides?.find(f => f.id === t.id);
		if (overrideAttributes)
			builtElement = cloneElement(builtElement, overrideAttributes.attributes);

		newValue.push(builtElement);

		elements.push(t);
	});

	newState.value = newValue;
	newState.elements = elements;
	newState.tAddElements = null;
};

export default onAddElements;
