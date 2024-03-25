//React
import { cloneElement } from 'react';

//Event
const onRemoveElements = ({ state: { tRemoveElements, value, elements } }, newState) => {
	const newValue = [
		cloneElement(value[0])
	];

	elements.forEach((e, i) => {
		const shouldRemove = tRemoveElements.some(t => t === e.id);
		if (shouldRemove)
			return;

		newValue.push(cloneElement(value[i + 1]));
	});

	elements.spliceWhere(e => tRemoveElements.includes(e.id));

	newState.value = newValue;
	newState.elements = elements;
	newState.tRemoveElements = false;
};

export default onRemoveElements;
