import { Canvas } from '@react-three/fiber'

import Scene from './Scene'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

function App() {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App
