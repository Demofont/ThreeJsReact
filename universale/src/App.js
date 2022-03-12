import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div className="App">
	  <Canvas>
	  <ambientLight intensity = {0.1} />
	  <pointLight position = {[10, 10, 10]}/>
		<mesh position = {[0, 1, 0]}>
	  		<boxGeometry/>
	  	</mesh>
	  </Canvas>
    </div>
  );
}

export default App;