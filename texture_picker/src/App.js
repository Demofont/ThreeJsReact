import './App.css';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei/core/';

function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/shoe-draco.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

function App() {
  return (
    <div className="App">
	  <Suspense fallback={null}>
	  	<Canvas>
			<ambientLight intensity={0.5}/>
			<Model />
	  	</Canvas>
	  </Suspense>
    </div>
  )
}

export default App;