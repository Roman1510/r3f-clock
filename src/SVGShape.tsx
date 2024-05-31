import { useState, useRef, useMemo, FC } from 'react'
import { MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/Addons.js'
import { Mesh } from 'three'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

interface SVGShapeProps extends MeshProps {
  svgPath: string
  color: string
}

const SVGShape: FC<SVGShapeProps> = ({ svgPath, color, ...restProps }) => {
  const meshRef = useRef<Mesh>(null)
  const randomNumber = useRef(Math.random() * 10000)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        -1.75 + Math.sin(state.clock.elapsedTime + randomNumber.current) / 10
    }
  })

  const {
    paths: [path],
  } = useLoader(SVGLoader, svgPath)
  const geometry = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData!.style
      ),
    [path]
  )

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(event) => {
        event.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setIsHovered(false)
      }}
      geometry={geometry}
      {...restProps}
    >
      <meshBasicMaterial color={color} toneMapped={false} />
      {isHovered && (
        <EffectComposer multisampling={8}>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0}
            intensity={0.5}
          />
          <Noise premultiply opacity={0.02} />
        </EffectComposer>
      )}
    </mesh>
  )
}

export default SVGShape
