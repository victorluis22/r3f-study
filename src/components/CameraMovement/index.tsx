import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyPress} from 'react-use'
import { useSpring } from "@react-spring/three";


interface CameraControlProps{
  canvasRef: React.MutableRefObject<null>
}

const CameraMovement: React.FC<CameraControlProps> = ({canvasRef}) => {
  const camera = useThree((state) => state.camera)
  const [moveFoward] = useKeyPress('w')
  const [moveLeft] = useKeyPress('a')
  const [moveRight] = useKeyPress('d')
  const [moveBackward] = useKeyPress('s')
  const movementSpeed = 0.5

  const [rotation, setRotation] = useState({x: 0, y: 0});

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 8 - 4;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    setRotation({
      x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, y)),
      y: -Math.max(-Math.PI, Math.min(Math.PI, x)),
    });
  }

  useEffect(() => {
    window.addEventListener('mousemove', (e) => handleMouseMove(e));

    return () => {
      window.removeEventListener('mousemove', (e) => handleMouseMove(e));
    };
  }, []);
  
  useFrame(() => {
    if(moveFoward){
      camera.position.set(camera.position.x - (movementSpeed * rotation.y), camera.position.y, camera.position.z - movementSpeed)
    }
    if(moveBackward){
      camera.position.set(camera.position.x + (movementSpeed * rotation.y), camera.position.y, camera.position.z+movementSpeed)
    }
    if(moveLeft){
      camera.position.set(camera.position.x-movementSpeed, camera.position.y, camera.position.z)
    }
    if(moveRight){
      camera.position.set(camera.position.x+movementSpeed, camera.position.y, camera.position.z)
    }

    camera.rotation.x = rotation.x;
    camera.rotation.y = rotation.y;
  })

  console.log(camera.rotation, camera.position)

  return(
    null
  )
}

export default CameraMovement