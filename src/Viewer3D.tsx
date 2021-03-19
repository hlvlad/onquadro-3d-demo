import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MolstarDemoViewer } from "./MolstarDemoViewer";

type Viewer3DProps = {
  id: string,
  structure3d: string | ArrayBuffer,
  structure3dAppearance: "ball-and-stick" | "cartoon" | "putty"
}

const Viewer3D = ({id, structure3d, structure3dAppearance} : Viewer3DProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [molstarPlugin, setMolstarPlugin] = useState<MolstarDemoViewer | undefined>();

  useLayoutEffect(() => {
    if (viewerRef.current != null) {
      setMolstarPlugin(new MolstarDemoViewer(viewerRef.current));
    }
  }, [])

  useEffect(() => {
    if (molstarPlugin) {
      if(structure3d) {
        console.log(structure3d);
        molstarPlugin.loadStructureFromData(structure3d, "mmcif")
      }
    }
  }, [molstarPlugin, structure3d]);

  useEffect(() => {
      if(molstarPlugin) {
        molstarPlugin.updateMoleculeRepresentation(structure3dAppearance)
      }
  }, [structure3dAppearance])


  return (
      <div id={id}>
        <div id="viewer3d" ref={viewerRef} />
      </div>
  )
}

export default Viewer3D;
