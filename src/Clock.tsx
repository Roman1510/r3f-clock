import { GroupProps, useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import { DoubleSide, Group } from 'three'

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
    <group ref={clockRef} {...props} rotation={[Math.PI, 1.2, Math.PI / 2]}>
      <group position={[5, 0, 0]} ref={secondsHandRef}>
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[3, 0.5, 0.5]} />
          <meshStandardMaterial color={'blue'} side={DoubleSide} />
        </mesh>
      </group>
      <group position={[5, 0, 0]} ref={minutesHandRef}>
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[2, 0.5, 0.5]} />
          <meshStandardMaterial color={'red'} side={DoubleSide} />
        </mesh>
      </group>
      <group position={[5, 0, 0]} ref={hoursHandRef}>
        <mesh position={[-5, 0, 0]}>
          <boxGeometry args={[1, 0.5, 0.5]} />
          <meshStandardMaterial color={'green'} side={DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}