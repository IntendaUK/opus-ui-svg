//React
import { cloneElement } from 'react';

//Event
const onSetElementAttributeOverrides = (
	{ setState, state: { value, elementAttributeOverrides } }
) => {
	if (!elementAttributeOverrides)
		return;

	const newValue = [];

	value.forEach(v => {
		const overrideEntry = elementAttributeOverrides.find(f => f.id === v.key);

		if (!overrideEntry) {
			newValue.push(v);

			return;
		}

		const newEntry = cloneElement(v, { ...overrideEntry.attributes });

		newValue.push(newEntry);
	});

	setState({ value: newValue });
};

export default onSetElementAttributeOverrides;
