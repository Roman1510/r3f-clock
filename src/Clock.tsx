import { GroupProps, useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react'
import { DoubleSide, Group, Vector3 } from 'three'

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
      <group position={[5, -0.3, 0]} ref={secondsHandRef}>
        <mesh position={[-2, 0, 0.1]}>
          <boxGeometry args={[3, 0.2, 0.2]} />
          <meshStandardMaterial color={'blue'} side={DoubleSide} />
        </mesh>
      </group>

      <group position={[5, 0, 0]} ref={minutesHandRef}>
        <mesh position={[-2.3, 0.2, 0]}>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshStandardMaterial color={'red'} side={DoubleSide} />
        </mesh>
      </group>
      <group position={[5, 0, 0]} ref={hoursHandRef}>
        <mesh position={[-4.2, 0, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.4]} />
          <meshStandardMaterial color={'green'} side={DoubleSide} />
        </mesh>
      </group>
      <group position={[5, 0, 0]}>
        {[...Array(4)].map((_, index) => {
          const angle = (index / 4) * Math.PI * 2
          const offset = 5
          const position = new Vector3(
            Math.cos(angle) * offset,
            0,
            Math.sin(angle) * offset
          )
          return (
            <group key={index}>
              <mesh key={index} rotation={[0, angle, 0]} position={position}>
                <boxGeometry args={[1, 0.3, 0.3]} />
                <meshBasicMaterial color={'white'} />
              </mesh>
            </group>
          )
        })}
      </group>
      <group position={[5, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
        {[...Array(4)].map((_, index) => {
          const angle = (index / 4) * Math.PI * 2
          const offset = 5
          const position = new Vector3(
            Math.cos(angle) * offset,
            0,
            Math.sin(angle) * offset
          )
          return (
            <group key={index}>
              <mesh key={index} rotation={[0, angle, 0]} position={position}>
                <boxGeometry args={[0.5, 0.2, 0.2]} />
                <meshBasicMaterial color={'white'} />
              </mesh>
            </group>
          )
        })}
      </group>
      <group position={[5, 0, 0]} rotation={[0, -Math.PI / 3, 0]}>
        {[...Array(4)].map((_, index) => {
          const angle = (index / 4) * Math.PI * 2
          const offset = 5
          const position = new Vector3(
            Math.cos(angle) * offset,
            0,
            Math.sin(angle) * offset
          )
          return (
            <group key={index}>
              <mesh key={index} rotation={[0, angle, 0]} position={position}>
                <boxGeometry args={[0.5, 0.2, 0.2]} />
                <meshBasicMaterial color={'white'} />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}
