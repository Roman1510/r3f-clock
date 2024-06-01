import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { Suspense } from 'react'

import { AdaptiveDpr, CameraShake } from '@react-three/drei'

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [8, 0, 15] }}>
        <color attach="background" args={['black']} />
        <ambientLight intensity={3} />
        <Suspense fallback={null}>
          <Scene />
          <AdaptiveDpr pixelated />
        </Suspense>
        <CameraShake
          yawFrequency={0.2}
          pitchFrequency={0.1}
          rollFrequency={0.1}
        />
      </Canvas>
    </div>
  )
}

export default App
