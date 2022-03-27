import './App.css';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei/core/';
import { proxy, useSnapshot } from 'valtio';
import { HexColorPicker } from "react-colorful"

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
		<div className="PickBar" style = {{ display: snap.current?"block":"none"}}>
			 < HexColorPicker className="picker"
			color = { snap.items[snap.current] }
			onChange = {(color) => (state.items[snap.current] = color)}
		/>
			<h1> { snap.current } </h1>
		</div>
	)
}

function App() {
  return (
	<>
	<Picker/>
		<div className="App">
			<Suspense fallback={null}>
				<Canvas>
	  				<OrbitControls />
					<ambientLight intensity={0.5}/>
	  				<spotLight intensity = {0.3} position = {[5, 20, 20]} />
	  				<Environment files="royal_esplanade_1k.hdr"/>
	  				<ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
					<Model />
	  			</Canvas>
	  		</Suspense>
    		</div>
	</>
  )
}

export default App;
