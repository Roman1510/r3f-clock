import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { Suspense, useState } from 'react'
import SVGShape from './SVGShape'
import { VolumetricRing } from './VolumentricRing'
import { Ground } from './Ground'
import { CameraShake } from '@react-three/drei'

function App() {
  const [hovered, setHovered] = useState(false)

  return (
    <Canvas dpr={[0.5, 0.7]} camera={{ position: [8, 0, 15] }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <Suspense fallback={null}>
        <Scene>
          <SVGShape
            svgPath="/triangle.svg"
            color="#a476f5"
            scale={0.007}
            position={[0, 0.4, -0.5]}
            rotation={[0, 0, Math.PI / 3]}
            setHovered={setHovered}
          />
          <SVGShape
            svgPath="/square.svg"
            color="#ff2060"
            scale={0.015}
            position={[4, 1, -2]}
            rotation={[0, 0, Math.PI / 2]}
            setHovered={setHovered}
          />
          <SVGShape
            svgPath="/circle.svg"
            color="#20ffbf"
            scale={0.009}
            position={[-0.9, 0.5, -2]}
            rotation={[0, 0, Math.PI / 3]}
            setHovered={setHovered}
          />
          <SVGShape
            svgPath="/X.svg"
            color="yellow"
            scale={0.03}
            position={[0, 2, -2.5]}
            rotation={[0, 0, Math.PI / 3]}
            setHovered={setHovered}
          />

          <VolumetricRing position={[-1, 0, 2.2]} scale={0.1} />
          <Ground />
        </Scene>
      </Suspense>
      <CameraShake
        yawFrequency={0.2}
        pitchFrequency={0.1}
        rollFrequency={0.1}
      />
    </Canvas>
  )
}

export default App
