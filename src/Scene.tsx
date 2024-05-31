import { useFrame } from '@react-three/fiber'
import { PropsWithChildren, useRef } from 'react'
import { Group, MathUtils, Vector3 } from 'three'

const Scene = ({ children }: PropsWithChildren) => {
  const ref = useRef<Group>(null)
  const cameraPosition = new Vector3()
  const refPosition = new Vector3()

  useFrame(({ pointer, camera }) => {
    if (ref.current) {
      cameraPosition.x = MathUtils.lerp(cameraPosition.x, pointer.x - 0.6, 0.05)
      cameraPosition.y = MathUtils.lerp(cameraPosition.y, -0.1, 0.05)
      cameraPosition.z = MathUtils.lerp(cameraPosition.z, 3, 0.05)

      refPosition.x = MathUtils.lerp(refPosition.x, pointer.x, 0.1)
      refPosition.y = MathUtils.lerp(refPosition.y, pointer.y * 0.1, 0.1)
      refPosition.z = MathUtils.lerp(refPosition.z, 0, 0.1)

      camera.position.copy(cameraPosition)
      ref.current.position.copy(refPosition)
      ref.current.rotation.y = MathUtils.lerp(
        ref.current.rotation.y,
        (-pointer.x * Math.PI) / 20,
        0.1
      )
    }
  })

  return <group ref={ref}>{children}</group>
}

export default Scene
