import { GroupProps } from '@react-three/fiber'
import { FC } from 'react'
import { Vector3 } from 'three'

interface IClockMechanismProps extends GroupProps {}

export const ClockMechanism: FC<IClockMechanismProps> = ({ ...props }) => {
  return (
    <>
      <group {...props}>
        <group>
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
        <group rotation={[0, Math.PI / 3, 0]}>
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
        <group rotation={[0, -Math.PI / 3, 0]}>
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
    </>
  )
}
