/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Airplane(props) {
    const { nodes, materials } = useGLTF("./models/airplane/model.glb");
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder_Cylinder001.geometry}
                material={materials["Material.001"]}
                position={[0.286, 0.231, -0.018]}
                rotation={[-Math.PI / 1.2, 1.5, Math.PI / 1.2]}
                scale={2}
            ><meshStandardMaterial color="white" /></mesh>
        </group>
    );
}

useGLTF.preload("./models/airplane/model.glb");
