import { useFrame } from '@react-three/fiber'
import { FC, useEffect, useRef } from 'react'
import { DoubleSide, Group, MathUtils } from 'three'

export const VolumetricRing: FC = (props) => {
  const innerRadius = 2
  const outerRadius = 4
  const thickness = 1
  const segments = 50
  const ringRef = useRef<Group>(null)

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.PI
    }
  }, [])

  useFrame(({ pointer }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = MathUtils.lerp(
        ringRef.current.rotation.x,
        Math.PI / 2 + pointer.y * 0.8,
        0.1
      )
      ringRef.current.rotation.y = MathUtils.lerp(
        ringRef.current.rotation.y,
        pointer.x * 0.8,
        0.1
      )
    }
  })

  return (
    <group ref={ringRef} {...props}>
      <mesh>
        <cylinderGeometry
          args={[outerRadius, outerRadius, thickness, segments, 1, true]}
        />
        <meshStandardMaterial color={'blue'} side={DoubleSide} />
      </mesh>
      <mesh>
        <cylinderGeometry
          args={[innerRadius, innerRadius, thickness, segments, 1, true]}
        />
        <meshStandardMaterial color={'red'} side={DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, thickness / 2, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
        <meshStandardMaterial color={'yellow'} side={DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -thickness / 2, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
        <meshStandardMaterial color={'green'} side={DoubleSide} />
      </mesh>
    </group>
  )
}
