import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function PlayerDua()
{

    const robotKu = useGLTF('./eve.glb')

    //const animationsKu = useAnimations(robotKu.animations, robot.scene)

    //console.log('animationsKu')

    const [posisi, setPosisi] = useState([10.5, -1, 0]);

 

    return <>

                    
{/*
                    <primitive 
                    object={ robotKu.scene } 
                    scale={ 5.5}
                    position={ [ -9.5, -1, 0 ] }
                   // position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                    //position={  posisi  }
                     rotation-y={rotationY }
                     />

                     */}




    </>
}