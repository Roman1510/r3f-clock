import { useRef, useMemo, FC } from 'react'
import { MeshProps, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three/examples/jsm/Addons.js'
import { Group } from 'three'
import { Float } from '@react-three/drei'

interface SVGShapeProps extends MeshProps {
  svgPath: string
  color: string
  setIsHovered?: (isHovered: boolean) => void
}

const SVGShape: FC<SVGShapeProps> = ({
  svgPath,
  color,
  setIsHovered,
  ...props
}) => {
  const groupRef = useRef<Group>(null)

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
    <Float
      speed={1}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[0.01, 0.35]}
    >
      <group
        ref={groupRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          console.log('true from svg shape')
          setIsHovered?.(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          console.log('false from svg shape')
          setIsHovered?.(false)
        }}
      >
        <mesh geometry={geometry} {...props}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  )
}

export default SVGShape
