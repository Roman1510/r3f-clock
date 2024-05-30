import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { Vector2 } from 'three'

export const Ground = () => {
  const [floor, normal] = useTexture([
    '/NewSurface.jpg',
    '/NewSurfaceNormalMap.png',
  ])

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <MeshReflectorMaterial
        blur={[500, 100]}
        mixBlur={12}
        mixStrength={1.5}
        position-y={-0.8}
        color="#f0f0f0"
        metalness={0}
        roughnessMap={floor}
        normalMap={normal}
        normalScale={new Vector2(2, 2)}
        mirror={1.0}
      />
    </mesh>
  )
}
