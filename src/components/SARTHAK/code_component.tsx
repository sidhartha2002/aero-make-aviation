import { Canvas } from "@react-three/fiber";
import Triangle from "./Triangle.jsx";
import { ScrollControls } from "@react-three/drei";
import { Experience } from "./Experience.jsx";
import { Overlay } from "./Overlay.jsx";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useMemo, createContext, useContext, useState } from "react";

// @ts-ignore
const Context = createContext();

export const PlayProvider = ({ children }) => {
  const [play, setPlay] = useState(false);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(false);
  const [end, setEnd] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  return (
    <Context.Provider
      value={{
        play,
        setPlay,
        menu,
        setMenu,
        preview,
        setPreview,
        end,
        setEnd,
        hasScroll,
        setHasScroll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const usePlay = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("usePlay must be used within a PlayProvider");
  }

  return context;
};

export const CanvasWrapper = () => {
  const { play, end } = usePlay();

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.08} />
      </EffectComposer>
    ),
    []
  );

  return (
    <div className="canvasWrapper">
      <Canvas>
        {!play && <Triangle />}

        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        {effects}
      </Canvas>
      <Overlay />
    </div>
  );
};
