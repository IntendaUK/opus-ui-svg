/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import './library';

//Opus Lib
import Opus from '@intenda/opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'start',
				crossAxisAlign: 'center',
				backgroundColor: 'grey',
				gap: '10px'
			},
			wgts: [{
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'yellow',
					fireScript: {
						actions: [{
							type: 'setState',
							target: 'svg',
							key: 'elementAttributeOverrides',
							value: [{
								id: 'l1',
								attributes: { stroke: 'red' }
							}]
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Set line color to red with "elementAttributeOverrides"'
					}
				}]
			}, {
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'pink',
					fireScript: {
						actions: [{
							type: 'setMultiState',
							target: 'svg',
							value: {
								tRemoveElements: ['l1'],
								tAddElements: [{
									type: 'bezierCurve',
									id: 'l1',
									fromComponent: {
										id: 'n1',
										anchorAxis: 'horizontal'
									},
									toComponent: {
										id: 'n2',
										anchorAxis: 'horizontal'
									}
								}]
							}
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Reset line data'
					}
				}]
			}, {
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'red',
					fireScript: {
						actions: [{
							type: 'setState',
							target: 'svg',
							key: 'tSetElementAttributes',
							value: [{
								id: 'l1',
								attributes: { stroke: 'red' }
							}]
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Set line color to red with "tSetElementAttributes"'
					}
				}]
			}, {
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'white',
					fireScript: {
						actions: [{
							type: 'setState',
							target: 'svg',
							key: 'tSetElementAttributes',
							value: [{
								id: 'l1',
								attributes: { stroke: 'black' }
							}]
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Set line color to black with "tSetElementAttributes"'
					}
				}]
			}, {
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'green',
					fireScript: {
						actions: [{
							type: 'setState',
							target: 'svg',
							key: 'tSetElementAttributes',
							value: [{
								id: 'l1',
								attributes: { strokeWidth: 5 }
							}]
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Set line stroke width to 5 with "tSetElementAttributes"'
					}
				}]
			}, {
				type: 'container',
				prps: {
					padding: true,
					canClick: true,
					backgroundColor: 'blue',
					fireScript: {
						actions: [{
							type: 'setState',
							target: 'svg',
							key: 'tSetElementAttributes',
							value: [{
								id: 'l1',
								attributes: { strokeWidth: 2 }
							}]
						}]
					}
				},
				wgts: [{
					type: 'label',
					prps: {
						cpt: 'Set line stroke width to 2 with "tSetElementAttributes"'
					}
				}]
			}, {
				type: 'container',
				prps: {
					singlePage: true,
					position: 'absolute',
					top: '0px',
					pointerEvents: 'none',
					scps: [
						{
							id: 's',
							actions: [
								{
									type: 'setVariable',
									name: 'nodes',
									value: [
										{
											id: 'n1',
											x: 0,
											y: 0,
											w: 100,
											h: 400
										},
										{
											id: 'n2',
											x: 0,
											y: 0,
											w: 150,
											h: 300
										},
										{
											id: 'n3',
											x: 0,
											y: 0,
											w: 200,
											h: 200
										}
									]
								},
								{
									type: 'setVariable',
									name: 'links',
									value: [
										{
											id: 'l1',
											source: 'n1',
											target: 'n2'
										},
										{
											id: 'l2',
											source: 'n1',
											target: 'n3'
										}
									]
								},
								{
									type: 'forceDirectGraph',
									nodes: '{{variable.nodes}}',
									links: '{{variable.links}}',
									storeAsVariable: 'newNodes',
									collideStrength: 0.15,
									stopWhenDeltaUnder: 0.05,
									snapToAxis: true,
									axisPadding: {
										x: 50,
										y: 50
									},
									center: {
										x: 100,
										y: 100
									}
								},
								{
									id: 'sM',
									type: 'mapArray',
									value: '{{variable.newNodes}}',
									mapTo: {
										id: '((variable.record.id))',
										type: 'containerSimple',
										prps: {
											backgroundColor: 'black',
											padding: true,
											position: 'absolute',
											left: '{{sM.variable.record.x}}',
											top: '{{sM.variable.record.y}}',
											width: '{{sM.variable.record.w}}',
											height: '{{sM.variable.record.h}}'
										},
										wgts: [
											{
												type: 'label',
												prps: {
													cpt: '{{sM.variable.record.id}}',
													color: 'white'
												}
											}
										]
									},
									storeAsVariable: 'extraWgts'
								},
								{
									id: 'sM',
									type: 'mapArray',
									value: '{{variable.links}}',
									mapTo: {
										type: 'bezierCurve',
										id: '((variable.record.id))',
										fromComponent: {
											id: '((sM.variable.record.source.id))',
											anchorAxis: 'horizontal'
										},
										toComponent: {
											id: '((sM.variable.record.target.id))',
											anchorAxis: 'horizontal'
										}
									},
									storeAsVariable: 'svgLinks'
								},
								{
									type: 'pushVariable',
									name: 'extraWgts',
									value: {
										id: 'svg',
										type: 'svg',
										prps: {
											position: 'absolute',
											left: '0px',
											top: '0px',
											width: '100%',
											height: '100%',
											pointerEvents: 'none',
											scps: [
												{
													triggers: [
														{
															event: 'onAllMounted',
															sourceList: '{{s.eval.{{s.variable.newNodes}}.map(m => m.id)}}'
														}
													],
													actions: [
														{
															type: 'setState',
															key: 'tAddElements',
															value: '{{s.variable.svgLinks}}'
														}
													]
												}
											]
										}
									}
								},
								{
									type: 'setState',
									key: 'extraWgts',
									value: '{{variable.extraWgts}}'
								}
							]
						}
					]
				}
			}]
		}}
	/>
);
