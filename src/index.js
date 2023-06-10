import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

    <KeyboardControls map={ [
        { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
    { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
    { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
    { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
    { name: 'jump', keys: [ 'Space' ] },
    { name: 'Shift', keys: [ 'Shift' ] },
    
    ] }
    >  
        <Canvas
            shadows
            camera={ {
                fov: 30,
                near: 0.5,
                far: 500,
                position: [ -58, 30, 40 ]
         } }
     >
          <Experience />
        </Canvas>
    </KeyboardControls>
)