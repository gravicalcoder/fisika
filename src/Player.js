
import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'


export default function Player()
{

    const robot = useGLTF('./edit.glb')

    const animations = useAnimations(robot.animations, robot.scene)

    // const { actions } = useAnimations(animations, group)
    
 
     const [ subscribeKeys, getKeys ] = useKeyboardControls()


    return <>

                    <primitive 
                    object={ robot.scene } 
                    scale={ 5.5}
                    position={ [ -9.5, -1, 0 ] }
                    //position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                   // position={  posisi  }
                     //rotation-y={rotationY }
                     />


    </>
}