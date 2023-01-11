import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={ {
            fov: 30,
            near: 0.5,
            far: 500,
            position: [ -28, 30, 40 ]
        } }
    >
        <Experience />
    </Canvas>
)