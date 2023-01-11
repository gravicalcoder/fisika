import {  useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {  InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, Debug, RigidBody, Physics } from '@react-three/rapier'
import {  useMemo, useEffect, useState,useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


var sudut = 0

export default function Experience()
{

  const cubesCount = 2

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
       
        let angle = sudut + ( Math.PI / 2 );

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
                     <boxGeometry args={ [ 40, 0.5, 40 ] } />
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


                  <RigidBody type="fixed">
                     <CuboidCollider args={ [ 5,8, 0.5 ] } position={ [ 0, 4, 5.5 ] } />
                     <CuboidCollider args={ [ 5, 8, 0.5 ] } position={ [ 0, 4, - 5.5 ] } />
                     <CuboidCollider args={ [ 0.5, 8, 5 ] } position={ [ 5.5, 4, 0 ] } />
                     <CuboidCollider args={ [ 0.5, 8, 5 ] } position={ [ - 5.5, 4, 0 ] } />
                  </RigidBody>


                  <RigidBody
                  ref={ meshRef }
                   position={ [ -8, - 0.8, 0 ] }
                    friction={ 0 }
                    type="kinematicPosition"
                    onClick={ balokJump }
                     >
                    <mesh castShadow scale={ [ 0.4, 0.4, 3 ] }>
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