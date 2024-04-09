//React
import { cloneElement } from 'react';

//Event
const onSetElementAttributes = (
	{ setState, state: { value, tSetElementAttributes, elementAttributeOverrides } }
) => {
	if (!tSetElementAttributes)
		return;

	const newValue = [];

	value.forEach(v => {
		const setEntry = tSetElementAttributes.find(f => f.id === v.key);

		if (!setEntry) {
			newValue.push(v);

			return;
		}

		const overrideEntry = elementAttributeOverrides?.find(f => f.id === v.key) ?? {};

		const newEntry = cloneElement(v, {
			...overrideEntry.attributes,
			...setEntry.attributes
		});

		newValue.push(newEntry);
	});

	setState({
		value: newValue,
		deleteKeys: ['tSetElementAttributes']
	});
};

export default onSetElementAttributes;
