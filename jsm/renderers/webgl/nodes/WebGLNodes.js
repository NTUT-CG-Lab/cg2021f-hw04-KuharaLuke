import { WebGLNodeBuilder } from './WebGLNodeBuilder.js';
import NodeFrame from '../../nodes/core/NodeFrame.js';

import { Material } from 'three';

const builders = new WeakMap();
export const nodeFrame = new NodeFrame();

Material.prototype.onBuild = function ( parameters, renderer ) {

	builders.set( this, new WebGLNodeBuilder( this, renderer, parameters ).build() );

};

Material.prototype.onBeforeRender = function ( renderer, scene, camera, geometry, object ) {

	const nodeBuilder = builders.get( this );

	if ( nodeBuilder !== undefined ) {

		nodeFrame.material = this;
		nodeFrame.camera = camera;
		nodeFrame.object = object;

		for ( const node of nodeBuilder.updateNodes ) {

			nodeFrame.updateNode( node );

		}

	}

};
