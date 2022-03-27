import './App.css';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei/core/';
import { proxy, useSnapshot } from 'valtio';

const state = proxy ({
	current: null,
	items: {
		lances: "#ff0000",
		mesh: "#ffffff",
		caps: "#ffffff",
		inner: "#ffffff",
		sole: "#ffffff",
		stripes: "#ffffff",
		band: "#ffffff",
		patch: "#ffffff",
	}
});

function Model({ ...props }) {
  const group = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shoe-draco.glb')
  const {hovered, set} = useState(null)
  return (
    <group ref={group} {...props} dispose={null} 
	onPointerOver = {(e)=>{e.stopPropagation();set(e.object.material.name)}}
	onPointerOut = {(e)=>{e.inerections.length===0 && set(null)}}
	onPointerDown = {(e)=>{e.stopPropagation();state.current = e.object.material.name}}
	onPointerMissed = {(e)=>{state.current = null}}
	  >
      <mesh material-color={snap.items.lances} geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh material-color={snap.items.mesh} geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh material-color={snap.items.caps} geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh material-color={snap.items.inner} geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh material-color={snap.items.sole} geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh material-color={snap.items.stripes} geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh material-color={snap.items.band} geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh material-color={snap.items.patch} geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

function Picker(){
	const snap = useSnapshot(state)
	return(
		<div className="picker">{snap.current}</div>
	)
}

function App() {
  return (
	<>
	<Picker/>
		<div className="App">
			<Suspense fallback={null}>
				<Canvas>
					<ambientLight intensity={0.5}/>
					<Model />
	  			</Canvas>
	  		</Suspense>
    		</div>
	</>
  )
}

export default App;
