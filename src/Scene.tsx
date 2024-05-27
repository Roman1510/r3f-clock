import { Environment } from '@react-three/drei'
import { useEnvironment } from '@react-three/drei'
const Scene = () => {
  const envMap = useEnvironment({ files: 'kloppenheim.hdr' })
  return (
    <>
      <ambientLight intensity={10} />
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          metalness={1}
          roughness={0.1}
          envMap={envMap}
          opacity={0.9}
          transparent
        />
      </mesh>
      <Environment resolution={512} background files={'kloppenheim.hdr'} />
    </>
  )
}

export default Scene
