import React from 'react';
import { usePlane } from '@react-three/cannon';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default function Plane() {
	const stone = useLoader(TextureLoader, "stone.jpg")
	const [ ref ] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [1, -2, -1]
	}))

	return (
		<mesh ref={ref}>
			<planeGeometry args = {[10, 10]}/>
			<meshStandardMaterial map={stone}/>
		</mesh>
	)
}
