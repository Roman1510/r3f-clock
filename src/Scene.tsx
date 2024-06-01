import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, MathUtils, Vector2, Vector3 } from 'three'
import SVGShape from './SVGShape'
import { Clock } from './Clock/Clock'
import { Ground } from './Ground'
import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

const Scene = () => {
  const ref = useRef<Group>(null)
  const cameraPosition = new Vector3()
  const refPosition = new Vector3()

  const isHovered = useRef(false)

  const handleHover = (value: boolean) => {
    isHovered.current = value
  }

  useFrame(({ pointer, camera }) => {
    if (ref.current) {
      camera.position.copy(cameraPosition)
      ref.current.position.copy(refPosition)

      cameraPosition.x = MathUtils.lerp(cameraPosition.x, pointer.x - 0.6, 0.05)
      cameraPosition.y = MathUtils.lerp(cameraPosition.y, -0.1, 0.05)
      cameraPosition.z = MathUtils.lerp(cameraPosition.z, 4, 0.03)

      refPosition.x = MathUtils.lerp(refPosition.x, pointer.x, 0.1)
      refPosition.y = MathUtils.lerp(refPosition.y, pointer.y * 0.1, 0.1)
      refPosition.z = MathUtils.lerp(refPosition.z, 0, 0.1)

      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        (-pointer.x * Math.PI) / 20,
        0.1
      )
    }
  })

  const glitchComponent = isHovered.current ? (
    <Glitch
      delay={new Vector2(0, 0)}
      duration={new Vector2(0.05, 0.1)}
      strength={new Vector2(0.1, 0.5)}
      mode={GlitchMode.SPORADIC}
      ratio={0.3}
    />
  ) : null

  return (
    <group ref={ref} position={[-5, -0.5, -1]} scale={0.9}>
      <SVGShape
        svgPath="/triangle.svg"
        color="#c487ed"
        scale={0.007}
        position={[-2, -1, -4]}
        rotation={[0, 0, Math.PI / 3]}
        setIsHovered={handleHover}
      />
      <SVGShape
        svgPath="/square.svg"
        color="#ff3333"
        scale={0.015}
        position={[3, 1, -6.3]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <SVGShape
        svgPath="/circle.svg"
        color="#20ffbf"
        scale={0.009}
        position={[-2.9, 0.5, -4]}
        rotation={[0, 0, Math.PI / 3]}
      />
      <SVGShape
        svgPath="/X.svg"
        color="yellow"
        scale={0.03}
        position={[-2, 2, -5.5]}
        rotation={[0, 0, Math.PI / 3]}
      />
      <Ground />
      <EffectComposer multisampling={8} enableNormalPass={false}>
        <Bloom luminanceThreshold={0.8} mipmapBlur />
        <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
        {glitchComponent!}
      </EffectComposer>
      <Clock
        position={[-2, 2.2, 1.2]}
        scale={0.26}
        rotation={[Math.PI, 1, Math.PI / 2]}
      />
    </group>
  )
}

export default Scene
