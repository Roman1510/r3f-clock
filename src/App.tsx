import { Canvas } from '@react-three/fiber'

import Scene from './Scene'
import { OrbitControls } from '@react-three/drei'

function App() {
  return (
    <>
      <Canvas>
        <Scene />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
