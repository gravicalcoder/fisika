import {  useAnimations, useGLTF, OrbitControls, useKeyboardControls  } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {  InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, Debug, RigidBody, Physics } from '@react-three/rapier'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
//import { useKeyboardControls } from '@react-three/drei'



var sudut = 0

export default function Experience()
{

  const cubesCount = 20

  const cubes = useRef()

  const cubeTransforms = useMemo(() =>
  {
    const positions = []
    const rotations = []
    const scales = []

    for(let i = 0; i < cubesCount; i++)
    {
      positions.push([ (Math.random() - 0.5) * 8, 6 + i * 0.2, (Math.random() - 0.5) * 8 ])
      rotations.push([ Math.random(), Math.random(), Math.random() ])

      const scale = 0.2 + Math.random() * 0.8
      scales.push([ scale, scale, scale ])

      /*
      const matrix = new THREE.Matrix4()
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1)
      )
      */
    }

    return { positions, rotations, scales } 
  }, [])

  /*
  useEffect(() =>
  {
    for(let i = 0; i < cubesCount; i++)
    {
      const matrix = new THREE.Matrix4()
      matrix.compose(
        new THREE.Vector3(i * 2, 0, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1)
    )
      cubes.current.setMatrixAt(i, matrix)
    }
      
  }, [])
  */

  const hamburger = useGLTF('./hamburger.glb')

  const dudukan = useGLTF('./dudukan-lampu-Body.glb')

  const tuyul = useGLTF('./model.gltf')

 
    const robot = useGLTF('./edit.glb')

    //console.log(robot)

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
   const [rotationY, setRotationY] = useState(0.8);
   const [runVelocity, setRunVelocity] = useState(7);
   const [action, setAction] = useState(animations.actions.Idle);
   const previousAction = usePrevious(action);

   

		useFrame((state, delta) =>
		{
		    const keys = getKeys()
		    
        const { forward, backward, leftward, rightward, Shift  } = getKeys()


         if (Shift  && runVelocity === 7) {
          setRunVelocity(20);
          
          setAction(animations.actions.Run)
        } else if (Shift  && runVelocity === 20) {
          setRunVelocity(7);
          setAction(animations.actions.Walk)
        }
        

 

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
           
  
        }
   
        else if (forward) {
          if(animations.actions.Idle && runVelocity == 7 ){

              setAction(animations.actions.Walk)
              action.play()
          } else if (animations.actions.Run && runVelocity == 20){

            setAction(animations.actions.Run)
            action.play()
        }
          

          const updatedPosisiX = posisi[0] - runVelocity * delta;
          const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
          //action.play()
            
          setPosisi(updatedPosisi);
          setRotationY(1.6);

        }

        else if (backward) {
          if(animations.actions.Idle && runVelocity == 7){

               setAction(animations.actions.Walk)
               action.play()
           } else if (animations.actions.Run && runVelocity == 20){

            setAction(animations.actions.Run)
            action.play()
        }
          const updatedPosisiX = posisi[0] + runVelocity * delta;
          const updatedPosisi = [updatedPosisiX, posisi[1], posisi[2]];
          //action.play()
          setPosisi(updatedPosisi);
          setRotationY(-1.6);
        } else if (leftward) {
          if(animations.actions.Idle && runVelocity == 7){

            setAction(animations.actions.Walk)
            action.play()
        } else if (animations.actions.Run && runVelocity == 20){

          setAction(animations.actions.Run)
          action.play()
      }
          const updatedPosisiZ = posisi[2] + runVelocity * delta;
          const updatedPosisi = [posisi[0], posisi[1], updatedPosisiZ];
          //action.play()
          setPosisi(updatedPosisi);
          setRotationY(3.2);
        } else if (rightward) {
          if(animations.actions.Idle && runVelocity == 7 ){

            setAction(animations.actions.Walk)
            action.play()
           }else if (animations.actions.Run && runVelocity == 20){

           setAction(animations.actions.Run)
           action.play()
           }
          const updatedPosisiZ = posisi[2] - runVelocity * delta;
          const updatedPosisi = [posisi[0], posisi[1], updatedPosisiZ];
          //action.play()
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
  


 

   
    

  const [ hitSound ] = useState(() => new Audio('./hit.mp3'))
    
    const collisionEnter = () =>
    {
        console.log('collision!')
        /*
        hitSound.currentTime = 0
       hitSound.volume = Math.random()
        hitSound.play()
        */
    }
    const cube = useRef()
    const twister = useRef()
    useFrame((state) =>
    {
      const time = state.clock.getElapsedTime()

      const angle = time * 0.5
      const x = Math.cos(angle) * 2
      const z = Math.sin(angle) * 2
      twister.current.setNextKinematicTranslation({ x: x, y:  -0.5, z: z })
  
      //console.log(time)
      const eulerRotation = new THREE.Euler(0, time * 3, 0)
      const quaternionRotation = new THREE.Quaternion()
       quaternionRotation.setFromEuler(eulerRotation)
       twister.current.setNextKinematicRotation(quaternionRotation)
      

    })

    const cubeJump = () =>
    {
      const mass = cube.current.mass()
      //console.log(mass)
        //console.log(cube.current)
        cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        //cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 })
        cube.current.applyTorqueImpulse({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 })
    }


    const meshRef = useRef()

    const balokJump = () =>
    {
      
       /***************************************** */
        let angle = sudut + ( Math.PI / 6 );
        /***************************************** */
       
        sudut = angle

        const eulerRotation = new THREE.Euler(0, angle , 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        meshRef.current.setNextKinematicRotation(quaternionRotation)
    }
 

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={ [ 0, -9.8, 0 ] } >
             <Debug /> 
            <RigidBody colliders="ball">
                 <mesh castShadow position={ [ -2, 4, 0 ] }>
                     <sphereGeometry />
                     <meshStandardMaterial color="orange" />
                 </mesh>
                 </RigidBody>


                 <RigidBody gravityScale={ 2 } restitution={ 0 } >
                      <mesh castShadow position={ [ 5, 8, 0 ] }  >
                             <boxGeometry  args={ [ 4, 2, 1 ] } />
                             <meshStandardMaterial color="mediumpurple" />
                        </mesh>
                        <mesh castShadow position={ [ 5, 8, 7 ] }>
                              <boxGeometry args={ [ 1, 1, 1 ] } />
                              <meshStandardMaterial color="mediumpurple" />
                     </mesh>
                </RigidBody>


             <RigidBody type="fixed"  restitution={ 1 } friction={ 0.7 } >
                <mesh receiveShadow position-y={ - 1.25 }>
                     <boxGeometry args={ [ 80, 0.5, 80 ] } />
                     <meshStandardMaterial color="greenyellow" />
                 </mesh>
              </RigidBody>

            {/*
              <RigidBody colliders={ false } position={ [ 0, 1, -0.25 ] } rotation={ [ Math.PI * 0.1, 0, 0 ] }>

                {/*
                <CuboidCollider args={ [ 1.5, 1.5, 0.5] } />
                <CuboidCollider args={ [ 0.25, 1, 0.25 ] } position={ [ 0, 0, 1 ] } rotation={ [ - Math.PI * 0.35, 0, 0 ] } />
                */}


                {/*
                <BallCollider args={ [ 1.5 ] } />
                <mesh castShadow >
                    <torusGeometry args={ [ 1, 0.5, 16, 32 ] } />
                    <meshStandardMaterial color="mediumpurple" />
                  </mesh>
                </RigidBody>
                */}

                <RigidBody 
                  ref={ cube } 
                  position={ [ 1.5, 2, 0 ] } 
                  
                  gravityScale={ 1 }
                  friction={ 0.5 }
                  colliders={ false }
                  //onCollisionEnter={ collisionEnter }
                  //onCollisionExit={ () => { console.log('exit') } }
                  //onSleep={ () => { console.log('sleep') } }
                  //onWake={ () => { console.log('wake') } }
                  >
                    
                     <mesh castShadow  onClick={ cubeJump }>
                       <boxGeometry />
                      <meshStandardMaterial color="mediumpurple" />
                     </mesh>
                     <CuboidCollider mass={ 2 } args={ [ 0.5, 0.5, 0.5 ] } />
                </RigidBody>

                <RigidBody
                  ref={ twister }
                   position={ [ 0, - 0.8, 0 ] }
                    friction={ 0 }
                    type="kinematicPosition"
                >
                    <mesh castShadow scale={ [ 0.4, 0.4, 8 ] }>
                      <boxGeometry />
                      <meshStandardMaterial color="red" />
                   </mesh>
                </RigidBody>

                <RigidBody  position={ [ 0, 12, 0 ] } >
                    <primitive object={ hamburger.scene } scale={ 0.25 } />
                     <CylinderCollider args={ [ 0.5, 1.25 ] } /> 
                  </RigidBody>


                  <RigidBody  position={ [ 2 , 11, 0 ] } >
                    <primitive object={ dudukan.scene } scale={ 0.025 } />
                     <CuboidCollider args={ [ 0.3, 0.25, 0.5 ] } /> 
                  </RigidBody>

                  <RigidBody  position={ [ 2 , 11, 0 ] } >
                    <primitive object={ tuyul.scene } scale={ 5.5} />
                     <CuboidCollider args={ [ 1, 1, 2 ] } /> 
                  </RigidBody>

                  {/* <RigidBody  position={ [ -12 , 11, 0 ] } >*/}
                    <primitive 
                    object={ robot.scene } 
                    scale={ 5.5}
                    //position={ [ -9.5, -1, 0 ] }
                    //position={ [ posisi.posisiX, posisi.posisiZ, posisi.posisiZ  ] }
                    position={  posisi  }
                     rotation-y={rotationY }
                     />
                     {/*<CuboidCollider args={ [ 1, 3, 2 ] } /> */}
                  {/*</RigidBody>*/}

                  {/*
                  <RigidBody  position={ [ -12 , 11, 0 ] } >
                  <primitive 
                    object={ robotDulu.scene } 
                    scale={ 5.5}
                    position={ [  9.5, -1, 0 ] }
                     rotation-y={ 0.5 }
                     />
                     {/*<CuboidCollider args={ [ 1, 3, 2 ] } /> */}
                    {/*</RigidBody>

                  */}

                  <RigidBody type="fixed">
                     <CuboidCollider args={ [ 5,8, 0.5 ] } position={ [ 0, 4, 5.5 ] } />
                     <CuboidCollider args={ [ 5, 8, 0.5 ] } position={ [ 0, 4, - 5.5 ] } />
                     <CuboidCollider args={ [ 0.5, 8, 5 ] } position={ [ 5.5, 4, 0 ] } />
                     <CuboidCollider args={ [ 0.5, 8, 5 ] } position={ [ - 5.5, 4, 0 ] } />
                  </RigidBody>


                  <RigidBody
                  ref={ meshRef }
                   position={ [ -9, - 0.8, 0 ] }
                    friction={ 0 }
                    type="kinematicPosition"
                    onClick={ balokJump }
                     >
                    <mesh castShadow scale={ [ 0.4, 0.4, 8 ] }>
                       <boxGeometry />
                       <meshStandardMaterial color="red" />
                   </mesh>
                </RigidBody>


                <InstancedRigidBodies
                positions={ cubeTransforms.positions }
                rotations={ cubeTransforms.rotations }
                scales={ cubeTransforms.scales }
                >
                   <instancedMesh  ref={ cubes }  castShadow receiveShadow args={[ null, null, cubesCount ]} >

                      <boxGeometry />
                     <meshStandardMaterial color="tomato" />
                  </instancedMesh>
                </InstancedRigidBodies>

        </Physics>

    </>
}