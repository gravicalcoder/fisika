
import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Player()
{

    const robot = useGLTF('./edit.glb')

    const animations = useAnimations(robot.animations, robot.scene)

    // const { actions } = useAnimations(animations, group)
    
 
     const [ subscribeKeys, getKeys ] = useKeyboardControls()

     function usePrevious(value) {
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();
        // Store current value in ref
        useEffect(() => {
          ref.current = value;
        }, [value]); // Only re-run if value changes
        // Return previous value (happens before update in useEffect above)
        return ref.current;
      }
  
      
     const [posisi, setPosisi] = useState([-10.5, -1, 0]);
     const [rotationY, setRotationY] = useState(0.9);
     const [runVelocity, setRunVelocity] = useState(20);
     const [action, setAction] = useState(animations.actions.Idle);
     const previousAction = usePrevious(action);

     useFrame((state, delta) =>
		{
		    const keys = getKeys()
		    
        const { forward, backward, leftward, rightward, Shift, walk  } = getKeys()



        if (!forward && !backward && !leftward && !rightward) {
          if(animations.actions.Walk || animations.actions.Run || animations.actions.TPose){

            if (previousAction) {

              previousAction.fadeOut(0.2);
              previousAction.stop();

            }
            
                 setAction(animations.actions.Idle)
                 action.play


                 console.log('harusnya idle')  

           } if (action !== animations.actions.Idle) {
            if (previousAction) {
              previousAction.fadeOut(0.2);
              previousAction.stop();
            }
            setAction(animations.actions.Idle);
            action.play();
            console.log('harusnya idle');
          }
           else  {
            setAction(animations.actions.Idle)
            action.play


           }
           
  
        }   else if (forward && Shift) {

      

            setRunVelocity(7);
            setAction(animations.actions.Walk)
            action.play()
            //action.play()
        
         
            const updatedPosisiX = posisi[0] - runVelocity * delta;
            const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
      
            
            setPosisi(updatedPosisi);
            setRotationY(1.8);

          

        }

       
        else if (forward) {

      

            setRunVelocity(20);
            setAction(animations.actions.Run)
            action.play()
            //action.play()
        
         
            const updatedPosisiX = posisi[0] - runVelocity * delta;
            const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
      
            
            setPosisi(updatedPosisi);
            setRotationY(1.8);

          

        }

          else if (Shift) {
            
            
                  
  
              setRunVelocity(7);
              setAction(animations.actions.Walk)
              action.play()
              //action.play()
          
           
            const updatedPosisiX = posisi[0] - runVelocity * delta;
            const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
        
              
            setPosisi(updatedPosisi);
            setRotationY(1.8);
  
          } 

  

  

        else if (backward) {
            setRunVelocity(20);
            setAction(animations.actions.Run)
            action.play()
        
          const updatedPosisiX = posisi[0] + runVelocity * delta;
          const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
          //action.play()
          setPosisi(updatedPosisi);
          setRotationY(-1.8);
        } else if (leftward) {
          setRunVelocity(20);
          setAction(animations.actions.Run)
          action.play()
      
          const updatedPosisiZ = posisi[2] + runVelocity * delta;
          const updatedPosisi = [posisi[0], posisi[1], updatedPosisiZ];
          //action.play()
          setPosisi(updatedPosisi);
          setRotationY(3.6);
        } else if (rightward) {
            setRunVelocity(20);
           setAction(animations.actions.Run)
           action.play()
           
          const updatedPosisiZ = posisi[2] - runVelocity * delta;
          const updatedPosisi = [posisi[0], posisi[1], updatedPosisiZ];
       
          setPosisi(updatedPosisi);
          setRotationY(0);
        }

		})


     useEffect(() => {
        if (action === animations.actions.Idle) {
          const timeout = setTimeout(() => {
            action.play();
          }, 0);
        
          return () => clearTimeout(timeout);
        }
      }, [action]);
      
  


    return <>

                    <primitive 
                    object={ robot.scene } 
                    scale={ 5.5}
                    position={ [ -9.5, -1, 0 ] }
                   // position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                    position={  posisi  }
                     rotation-y={rotationY }
                     />


    </>
}