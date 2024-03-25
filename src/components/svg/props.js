//Props
const props = {
	value: {
		desc: 'The SVG elements to be rendered specified as JSX',
		type: 'array',
		internal: true,
		dft: () => []
	},
	elements: {
		desc: 'The SVG elements to be rendered specified as JSON',
		type: 'array',
		internal: true,
		dft: () => []
	},
	onClickedElements: {
		desc: 'An array of all clickData entries for elements that have been clicked',
		internal: true
	},
	tAddElements: {
		desc: 'Elements to be added to the rendered array. Currently overwrites the value array when set',
		type: 'array',
		spec: [
			{
				type: 'bezierCurve',
				canClick: 'optional boolean',
				clickData: 'mixed type that will be sent to the click state',
				label: 'optional string',
				points: [{
					x: 'source x',
					y: 'source y'
				}, {
					x: 'target x',
					y: 'target y'
				}]
			},
			{
				type: 'smoothedLine',
				points: [{
					x: 'point 1 x',
					y: 'point 1 y'
				}, {
					x: 'point 2 x',
					y: 'point 2 y'
				}, {
					x: 'point 3 x',
					y: 'point 3 y'
				}]
			},
			{
				type: 'arrow',
				x: 'point x',
				y: 'point y'
			}
		]
	}
};

export default props;

