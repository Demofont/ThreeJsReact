import React, { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useBox } from '@react-three/cannon';

export default function Box( props ) {
	const [ ref ] = useBox(() => ({
		position: [0, 5, 0],
		mass: 1,
		...props
		
	}));
	const [crate, stone, wood] = useLoader(TextureLoader, [
		"crate.jpg",
		"stone.jpg",
		"wood.jpg"
	])

	return (
		<mesh ref = {ref}>
			<boxGeometry/>
			<meshStandardMaterial map = {crate}/>
		</mesh>
	)
}
