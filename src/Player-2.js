import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function PlayerDua()
{

    const robotKu = useGLTF('./vee.glb')

    const animationsKu = useAnimations(robotKu.animations, robotKu.scene)

    //animationsKu.actions.combo_punch.play()
    //animationsKu.actions.firing.play()
    //animationsKu.actions.walk.play()
    //animationsKu.actions.jumping_up.play()
    //animationsKu.actions.jumping_down.play()
    //animationsKu.actions.flying_kick.play()
    animationsKu.actions.jump.play()

    console.log(animationsKu)

    //const [posisi, setPosisi] = useState([10.5, -1, 10]);

 

    return <>

                    

                    <primitive 
                    object={ robotKu.scene } 
                    scale={ 7.5}
                    position={ [ 9.5, -1, 10 ] }
                   // position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                    //position={  posisi  }
                    // rotation-y={rotationY }
                     />

                     




    </>
}