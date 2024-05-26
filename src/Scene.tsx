import { Environment, MeshTransmissionMaterial } from '@react-three/drei'

const Scene = () => {
  return (
    <>
      <ambientLight intensity={10} />
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          thickness={0.3} // Adjust thickness for desired glass effect
          roughness={0.1} // Adjust roughness for clarity
          transmission={0.8} // Adjust transmission for transparency
        />
      </mesh>
      <Environment resolution={512} background preset="night" />
    </>
  )
}

export default Scene
