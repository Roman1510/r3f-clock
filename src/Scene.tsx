import { useFrame } from '@react-three/fiber'
import { PropsWithChildren, useRef } from 'react'
import { Group, MathUtils, Vector3 } from 'three'

function Scene({ children }: PropsWithChildren) {
  const ref = useRef<Group>(null)
  const vec = new Vector3()

  useFrame(({ pointer, camera }) => {
    if (ref.current) {
      camera.position.lerp(vec.set(pointer.x * 2, 0, 3.5), 0.05)
      ref.current.position.lerp(vec.set(pointer.x * 1, pointer.y * 0.1, 0), 0.1)
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
