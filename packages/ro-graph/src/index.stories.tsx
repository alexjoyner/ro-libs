import React, { useEffect } from 'react';
import { Panel } from 'ro-component-library';
import { Button } from '@storybook/react/demo';
import mx from 'mxgraph';

export default { title: 'Button' };

export const withText = () => (
	<div>
		<Panel>Hello World</Panel>
		<Button>Hello Button</Button>
	</div>
);
console.log(mx());
const {
	mxGraph,
	mxUtils,
	mxClient,
	mxConstraintHandler,
	mxConnectionHandler,
	mxEdgeHandler,
	mxConnectionConstraint,
	mxPoint,
	mxCellState,
	mxRubberband,
} = mx();

export const withEmoji = () => {
	useEffect(() => {
		const node = document.getElementById('Graph');
		if (!mxClient.isBrowserSupported()) {
			// Displays an error message if the browser is not supported.
			mxUtils.error('Browser is not supported!', 200, false);
		} else {
			// Snaps to fixed points
			mxConstraintHandler.prototype.intersects = function (
				icon,
				point,
				source,
				existingEdge
			) {
				return (
					!source || existingEdge || mxUtils.intersects(icon.bounds, point)
				);
			};

			// Special case: Snaps source of new connections to fixed points
			// Without a connect preview in connectionHandler.createEdgeState mouseMove
			// and getSourcePerimeterPoint should be overriden by setting sourceConstraint
			// sourceConstraint to null in mouseMove and updating it and returning the
			// nearest point (cp) in getSourcePerimeterPoint (see below)
			var mxConnectionHandlerUpdateEdgeState =
				mxConnectionHandler.prototype.updateEdgeState;
			mxConnectionHandler.prototype.updateEdgeState = function (
				pt,
				constraint
			) {
				if (pt != null && this.previous != null) {
					var constraints = this.graph.getAllConnectionConstraints(
						this.previous
					);
					var nearestConstraint = null;
					var dist = null;

					for (var i = 0; i < constraints.length; i++) {
						var cp = this.graph.getConnectionPoint(
							this.previous,
							constraints[i]
						);

						if (cp != null) {
							var tmp =
								(cp.x - pt.x) * (cp.x - pt.x) + (cp.y - pt.y) * (cp.y - pt.y);

							if (dist == null || tmp < dist) {
								nearestConstraint = constraints[i];
								dist = tmp;
							}
						}
					}

					if (nearestConstraint != null) {
						this.sourceConstraint = nearestConstraint;
					}

					// In case the edge style must be changed during the preview:
					// this.edgeState.style['edgeStyle'] = 'orthogonalEdgeStyle';
					// And to use the new edge style in the new edge inserted into the graph,
					// update the cell style as follows:
					//this.edgeState.cell.style = mxUtils.setStyle(this.edgeState.cell.style, 'edgeStyle', this.edgeState.style['edgeStyle']);
				}

				mxConnectionHandlerUpdateEdgeState.apply(this, arguments);
			};

			// Creates the graph inside the given container
			var graph = new mxGraph(node);
			graph.setConnectable(true);

			//graph.connectionHandler.connectImage = new mxImage('images/connector.gif', 16, 16);

			// Disables floating connections (only use with no connect image)
			if (graph.connectionHandler.connectImage == null) {
				graph.connectionHandler.isConnectableCell = function (cell) {
					return false;
				};
				mxEdgeHandler.prototype.isConnectableCell = function (cell) {
					return graph.connectionHandler.isConnectableCell(cell);
				};
			}

			graph.getAllConnectionConstraints = function (terminal) {
				if (terminal != null && this.model.isVertex(terminal.cell)) {
					return [
						new mxConnectionConstraint(new mxPoint(0, 0), true),
						new mxConnectionConstraint(new mxPoint(0.5, 0), true),
						new mxConnectionConstraint(new mxPoint(1, 0), true),
						new mxConnectionConstraint(new mxPoint(0, 0.5), true),
						new mxConnectionConstraint(new mxPoint(1, 0.5), true),
						new mxConnectionConstraint(new mxPoint(0, 1), true),
						new mxConnectionConstraint(new mxPoint(0.5, 1), true),
						new mxConnectionConstraint(new mxPoint(1, 1), true),
					];
				}

				return null;
			};

			// Connect preview
			graph.connectionHandler.createEdgeState = function (me) {
				var edge = graph.createEdge(
					null,
					null,
					null,
					null,
					null,
					'edgeStyle=orthogonalEdgeStyle'
				);

				return new mxCellState(
					this.graph.view,
					edge,
					this.graph.getCellStyle(edge)
				);
			};

			// Enables rubberband selection
			new mxRubberband(graph);

			// Gets the default parent for inserting new cells. This
			// is normally the first child of the root (ie. layer 0).
			var parent = graph.getDefaultParent();

			// Adds cells to the model in a single step
			graph.getModel().beginUpdate();
			try {
				var v1 = graph.insertVertex(
					parent,
					null,
					'Hello,',
					20,
					20,
					80,
					60,
					'shape=triangle;perimeter=trianglePerimeter'
				);
				var v2 = graph.insertVertex(
					parent,
					null,
					'World!',
					200,
					150,
					80,
					60,
					'shape=ellipse;perimeter=ellipsePerimeter'
				);
				var v3 = graph.insertVertex(parent, null, 'Hello,', 200, 20, 80, 30);
				var e1 = graph.insertEdge(
					parent,
					null,
					'',
					v1,
					v2,
					'edgeStyle=elbowEdgeStyle;elbow=horizontal;' +
						'exitX=0.5;exitY=1;exitPerimeter=1;entryX=0;entryY=0;entryPerimeter=1;'
				);
				var e2 = graph.insertEdge(
					parent,
					null,
					'',
					v3,
					v2,
					'edgeStyle=elbowEdgeStyle;elbow=horizontal;orthogonal=0;' +
						'entryX=0;entryY=0;entryPerimeter=1;'
				);
			} finally {
				// Updates the display
				graph.getModel().endUpdate();
			}
		}
	}, []);
	return (
		<div>
			<div id='Graph'></div>
		</div>
	);
};
