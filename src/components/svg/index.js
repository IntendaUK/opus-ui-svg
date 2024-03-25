//React
import React, { useEffect } from 'react';

//Events
import onAddElements from './events/onAddElements';
import onRemoveElements from './events/onRemoveElements';

//Styles
import './styles.css';

//Events
const onAddRemoveElements = props => {
	const { setState, state: { tRemoveElements, tAddElements } } = props;

	const newState = {};

	if (tRemoveElements?.length > 0)
		onRemoveElements(props, newState);

	if (tAddElements?.length > 0)
		onAddElements(props, newState);

	setState(newState);
};

//Exports
export const Svg = props => {
	const { id, classNames, style, getHandler, attributes, state } = props;
	const { tAddElements, tRemoveElements, value } = state;

	const handlerDelta = JSON.stringify(tRemoveElements) + JSON.stringify(tAddElements);
	useEffect(getHandler(onAddRemoveElements), [handlerDelta]);

	return (
		<svg
			id={id}
			className={classNames}
			style={style}
			{...attributes}
		>
			{value}
		</svg>
	);
};
