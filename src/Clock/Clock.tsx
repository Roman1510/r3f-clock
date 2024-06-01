import { GroupProps, useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import { DoubleSide, Group } from 'three'
import { ClockMechanism } from './ClockMechanism'

interface IClockProps extends GroupProps {}

export const Clock: FC<IClockProps> = ({ ...props }) => {
  const clockRef = useRef<Group>(null)
  const secondsHandRef = useRef<Group>(null)
  const minutesHandRef = useRef<Group>(null)
  const hoursHandRef = useRef<Group>(null)

  useFrame(() => {
    const date = new Date()
    const seconds = date.getSeconds()
    const minutes = date.getMinutes()
    const hours = date.getHours()

    const secondsAngle = (seconds / 60) * Math.PI * 2
    const minutesAngle = (minutes / 60) * Math.PI * 2
    const hoursAngle = (hours / 12) * Math.PI * 2

    secondsHandRef.current!.rotation.y = secondsAngle
    minutesHandRef.current!.rotation.y = minutesAngle
    hoursHandRef.current!.rotation.y = hoursAngle
  })

  return (
    <group ref={clockRef} {...props}>
      <group position={[5, -0.3, 0]} ref={secondsHandRef}>
        <mesh position={[-2, 0, 0.1]}>
          <boxGeometry args={[3, 0.2, 0.2]} />
          <meshBasicMaterial
            color={'lightgreen'}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      <group position={[5, 0, 0]} ref={minutesHandRef}>
        <mesh position={[-2.3, 0.2, 0]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshBasicMaterial
            color={'yellow'}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
      <group position={[5, 0, 0]} ref={hoursHandRef}>
        <mesh position={[-4.2, 0, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.4]} />
          <meshBasicMaterial
            color={'cyan'}
            side={DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>
      <ClockMechanism position={[5, 0, 0]} />
    </group>
  )
}
