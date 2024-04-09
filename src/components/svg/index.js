//React
import React, { useEffect } from 'react';

//Events
import onAddElements from './events/onAddElements';
import onRemoveElements from './events/onRemoveElements';
import onSetElementAttributes from './events/onSetElementAttributes';
import onSetElementAttributeOverrides from './events/onSetElementAttributeOverrides';

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
	const { tAddElements, tRemoveElements, tSetElementAttributes } = state;
	const { value, elementAttributeOverrides } = state;

	const deltaChangeElements = JSON.stringify(tRemoveElements) + JSON.stringify(tAddElements);
	useEffect(getHandler(onAddRemoveElements), [deltaChangeElements]);

	const deltaSetAttributes = JSON.stringify(tSetElementAttributes);
	useEffect(getHandler(onSetElementAttributes), [deltaSetAttributes]);

	const delteOverrides = JSON.stringify(elementAttributeOverrides);
	useEffect(getHandler(onSetElementAttributeOverrides), [delteOverrides]);

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
