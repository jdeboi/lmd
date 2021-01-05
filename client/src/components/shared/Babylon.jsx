import { Engine, Scene } from 'babylonjs'
import React, { useEffect, useRef, useState } from 'react'

export default (props) => {
  const reactCanvas = useRef(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

  useEffect(() => {
    if(reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        props.onSceneReady(scene)
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene);
        }
        scene.render();
      })

      const resize = () => {
        scene.getEngine().resize();
      }

      if (window) {
        window.addEventListener('resize', resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener('resize', resize);
        }
      }
    }
  }, [reactCanvas])

  return (
    <canvas touch-action="none" id="renderCanvas" tabIndex="1" ref={reactCanvas} {...rest} />
  );
}
