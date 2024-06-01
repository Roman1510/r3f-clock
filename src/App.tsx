import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { Suspense } from 'react'
import { AdaptiveDpr, CameraShake } from '@react-three/drei'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        <Canvas camera={{ position: [5, 0, 12] }}>
          <color attach="background" args={['black']} />
          <ambientLight intensity={3} />
          <directionalLight position={[3, 2, -3]} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <CameraShake
            yawFrequency={0.2}
            pitchFrequency={0.1}
            rollFrequency={0.1}
          />
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>
    </div>
  )
}

export default App
