//React
import { cloneElement } from 'react';

//System Helpers
import { spliceWhere } from '@intenda/opus-ui';

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

	spliceWhere(elements, e => tRemoveElements.includes(e.id));

	newState.value = newValue;
	newState.elements = elements;
	newState.tRemoveElements = null;
};

export default onRemoveElements;
