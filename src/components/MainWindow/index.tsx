import * as THREE from 'three'
import React, { useRef } from "react";
import { Container } from "./style";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Box from "../Box";
import { Stats } from "@react-three/drei";
import { AxesHelper, Color } from "three";
import { OrbitControls } from '@react-three/drei';
import CameraMovement from '../CameraMovement';
import { useGLTF } from '@react-three/drei';
import Solo from '../Solo';



interface AxisProps{
    size: number
}
const AxisHelper: React.FC<AxisProps> = ({size}) => {
  const { scene } = useThree();
  const axesHelper = new AxesHelper(size);
  scene.add(axesHelper);

  return null;
}


interface ModelProps {
    width?: number | null | undefined,
    height?: number | null | undefined,
    model?: string,
    allowMoviment?: boolean | null | undefined,
    showStat?: boolean | null | undefined,
    showAxis?: boolean | null | undefined,
    backgroundColor?: string | null | undefined,
}  

const MainWindow: React.FC<ModelProps> = ({width, height, model, allowMoviment, showStat, showAxis, backgroundColor}) => {
    const canvaRef = useRef(null)

    return(
        <Container>
            <Canvas ref={canvaRef}>
              <CameraMovement canvasRef={canvaRef}/>
                {/* <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    enableDamping={true}
                    dampingFactor={0.5}
                    rotateSpeed={0.5}
                    zoomSpeed={2}
                    panSpeed={0.5}
                    target={[0, 0, 0]}
                /> */}
                <AxisHelper size={5} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* <Box position={[-1.2, 0, 0]}/>
                <Box position={[1.2, 0, 0]} /> */}
                <Solo />
                <Stats />
            </Canvas>
        </Container>
    )
}

export default MainWindow