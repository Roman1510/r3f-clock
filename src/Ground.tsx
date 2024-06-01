import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { Vector2 } from 'three'

export const Ground = () => {
  const [floor, normal] = useTexture([
    '/NewSurface.jpg',
    '/NewSurfaceNormalMap.png',
  ])

  return (
    <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <MeshReflectorMaterial
        blur={[100, 150]}
        color="#f0f0f0"
        depthScale={1}
        maxDepthThreshold={5}
        minDepthThreshold={0}
        mixBlur={12}
        mixStrength={1.5}
        resolution={512}
        roughness={0.8}
        roughnessMap={floor}
        normalMap={normal}
        normalScale={new Vector2(1.5, 1.5)}
        mirror={1}
        metalness={0}
      />
    </mesh>
  )
}
