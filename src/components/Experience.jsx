import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Speed } from "./Speed";
import { TextSection } from "./TextSection";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import image1 from "../assets/images/01.Trusted Global Partner.jpg";
import image2 from "../assets/images/02.Operational Excellence.jpg";
import image3 from "../assets/images/03.Innovative Solutions.jpg";
import image4 from "../assets/images/04.Tailored Precision Service.jpg";
import image5 from "../assets/images/05.Customer Experience.jpg";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 7,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        position2: new Vector3(-2.5, 0, 0),
        title: "A Trusted Global Partner",
        subtitle: `Aeromake Aviation has earned the trust of a global clientele, including leading commercial airlines, cargo carriers, regional operators, and MROs, attesting to its position as a go-to provider in the aircraft material support industry.`,
        imageUrl: image1,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 1,
          curvePoints[2].y - 1,
          curvePoints[2].z
        ),
        position2: new Vector3(5, 1, 0),
        title: "Operational Excellence Through Experience",
        subtitle: `The company's operational excellence is rooted in its extensive experience, allowing it to deliver unparalleled support for aircraft inventory and top-tier component services.`,
        imageUrl: image2,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 5,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        position2: new Vector3(-2.5, 0, 0),
        title: "Innovative Solutions for Success",
        subtitle: `Aeromake Aviation's commitment to innovation fuels its ability to pioneer groundbreaking solutions that empower clients to attain new heights of operational efficiency and excellence.`,
        imageUrl: image3,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 5.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        position2: new Vector3(5, 1, 0),
        title: "Tailored Precision in Service",
        subtitle: `Recognizing the critical role of reliable spares support, Aeromake Aviation offers meticulously tailored solutions, drawing on the expertise of its seasoned professionals to optimize operational efficiency and cost-effectiveness.`,
        imageUrl: image4,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[5].x - 5,
          curvePoints[5].y,
          curvePoints[5].z
        ),
        position2: new Vector3(-2.5, 0, 0),
        title: "Exceptional Customer Experience",
        subtitle: `A hallmark of Aeromake Aviation is its dedication to an exceptional customer experience, with streamlined communication channels, prompt support, and competitive pricing ensuring client satisfaction at every step.`,
        imageUrl: image5,
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      // STARTING
      {
        position: new Vector3(-3.5, -3.2, -7),
      },
      {
        position: new Vector3(3.5, -4, -10),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(-18, 0.2, -68),
        rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(2.5, 2.5, 2.5),
        position: new Vector3(10, -1.2, -52),
      },
      // FIRST POINT
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[1].x + 10,
          curvePoints[1].y - 4,
          curvePoints[1].z + 64
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[1].x - 20,
          curvePoints[1].y + 4,
          curvePoints[1].z + 28
        ),
        rotation: new Euler(0, Math.PI / 7, 0),
      },
      {
        rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x - 13,
          curvePoints[1].y + 4,
          curvePoints[1].z - 62
        ),
      },
      {
        rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x + 54,
          curvePoints[1].y + 2,
          curvePoints[1].z - 82
        ),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x + 8,
          curvePoints[1].y - 14,
          curvePoints[1].z - 22
        ),
      },
      // SECOND POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[2].x + 6,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 26
        ),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[3].x + 0,
          curvePoints[3].y - 5,
          curvePoints[3].z - 98
        ),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x + 24,
          curvePoints[4].y - 6,
          curvePoints[4].z - 42
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[7].x + 12,
          curvePoints[7].y - 5,
          curvePoints[7].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[7].x - 12,
          curvePoints[7].y + 5,
          curvePoints[7].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRAIT
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;

    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );

    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    cameraGroup.current.position.lerp(curPoint, delta * 24);

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4; // stronger angle

    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const airplane = useRef();

  const tl = useRef();

  const backgroundColors = useRef({
    colorA: "#04213c",
    colorB: "#174f8f",
  });
  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#6f35cc",
      colorB: "#ffad30",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#424242",
      colorB: "#ffcc00",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#81318b",
      colorB: "#55ab8f",
    });

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        <group ref={cameraGroup}>
          <Speed />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <Airplane
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
            </Float>
          </group>
        </group>
        {/* TEXT */}

        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {/* CLOUDS */}
        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    []
  );
};

// fade material
const replaceFragmentShader = (fragmentShader) =>
  fragmentShader
    .replace(
      `#include <common>`,
      `#include <common>
  float exponentialEasing(float x, float a) {

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));

    if (a < 0.5){
      // emphasis
      a = 2.0*(a);
      float y = pow(x, a);
      return y;
    } else {
      // de-emphasis
      a = 2.0*(a-0.5);
      float y = pow(x, 1.0/(1.0-a));
      return y;
    }
  }`
    )
    .replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
float fadeDist = 350.0;
float dist = length(vViewPosition);

float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
fadeOpacity = exponentialEasing(fadeOpacity, 0.93);
vec4 diffuseColor = vec4( diffuse, fadeOpacity * opacity );`
    );

export const fadeOnBeforeCompile = (shader) => {
  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader);
};

export const fadeOnBeforeCompileFlat = (shader) => {
  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader).replace(
    `#include <output_fragment>`,
    `gl_FragColor = diffuseColor;`
  );
};

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
      >
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/airplane/model.glb");
