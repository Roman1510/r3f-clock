import { MeshReflectorMaterial, useTexture } from '@react-three/drei'

export const Ground = () => {
  const [floor, normal] = useTexture([
    '/NewSurface.jpg',
    '/NewSurfaceNormalMap.png',
  ])

  return (
    <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <MeshReflectorMaterial
        blur={[250, 150]}
        color="#f0f0f0"
        depthScale={0.5}
        maxDepthThreshold={5}
        minDepthThreshold={0}
        mixBlur={1}
        mixStrength={8}
        metalness={0.5}
        resolution={1024}
        roughness={0.8}
        roughnessMap={floor}
        normalMap={normal}
        mirror={1}
      />
    </mesh>
  )
}
