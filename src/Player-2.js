import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function PlayerDua()
{

    const robotKu = useGLTF('./remy.glb')

    const animationsKu = useAnimations(robotKu.animations, robotKu.scene)

    
    
    
    
    
    
    //animationsKu.actions.jumping.play()
    //animationsKu.actions.back_flip.play()
    //animationsKu.actions.combo_punch.play()
    //animationsKu.actions.walk.play()
    //animationsKu.actions.crouch_to_stand.play()
    //animationsKu.actions.crouching_idle.play()
    //animationsKu.actions.falling_roll.play()
    //animationsKu.actions.run_slide.play()
    //animationsKu.actions.kick_1.play()
    //animationsKu.actions.kick_2.play()
    animationsKu.actions.kick_3.play()

    console.log(animationsKu)

    //const [posisi, setPosisi] = useState([10.5, -1, 10]);

 

    return <>

                    

                    <primitive 
                    object={ robotKu.scene } 
                    scale={ 2.5}
                    position={ [ 9.5, -1, 10 ] }
                   // position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                    //position={  posisi  }
                    // rotation-y={rotationY }
                     />

                     




    </>
}