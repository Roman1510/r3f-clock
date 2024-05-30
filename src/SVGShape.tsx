import { useState, useRef, useMemo, FC } from 'react'
import { MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/Addons.js'
import { Mesh } from 'three'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

interface SVGShapeProps extends MeshProps {
  svgPath: string
  color: string
}

const SVGShape: FC<SVGShapeProps> = ({ svgPath, color, ...props }) => {
  const ref = useRef<Mesh>(null)
  const [r] = useState(() => Math.random() * 10000)
  const [hovered, setHovered] = useState(false)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        -1.75 + Math.sin(state.clock.elapsedTime + r) / 10
    }
  })

  const {
    paths: [path],
  } = useLoader(SVGLoader, svgPath)
  const geom = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData!.style
      ),
    [path]
  )

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
      geometry={geom}
      {...props}
    >
      <meshBasicMaterial color={color} toneMapped={false} />
      {hovered && (
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
