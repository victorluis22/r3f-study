import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import soloModel from '../../assets/solo.glb'

function Solo(props: ThreeElements['mesh']) {
  const{ scene } = useGLTF(soloModel);
  console.log(scene)

  return (
    <primitive object={scene} />
  )
}

export default Solo