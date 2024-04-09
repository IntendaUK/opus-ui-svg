//Helpers
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

/* eslint-disable-next-line max-lines-per-function */
export const getAutoAnchorPoints = (props, { fromComponent, toComponent }) => {
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
