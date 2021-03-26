import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {MolstarDemoViewer} from "./MolstarDemoViewer";
import "molstar/lib/mol-plugin-ui/skin/light.scss";

type Viewer3DProps = {
    id: string,
    structure3d: string | ArrayBuffer,
    structure3dRepresentation: "ball-and-stick" | "cartoon" | "putty",
    structure3dColoring: "uniform" | "element-symbol",
    uniformColor: {r: number, g:number, b:number}
}

const Viewer3D = ({id, structure3d, structure3dRepresentation, structure3dColoring, uniformColor}: Viewer3DProps) => {
    const parent = useRef<HTMLDivElement>(null);
    const [viewer, setViewer] = useState<MolstarDemoViewer | null>(null);

    useEffect(() => {
        if (parent.current !== null) {
            let viewer = new MolstarDemoViewer(parent.current);
            setViewer(viewer);
        }
    }, [] );

    useEffect(() => {
        if (viewer !== null) {
            viewer.loadStructureFromData(structure3d, "mmcif", {type: structure3dRepresentation, coloring: structure3dColoring, uniformColor: uniformColor});
        }
    }, [structure3d]);


    useEffect(() => {
        console.log("Updating view...")
        if (viewer !== null) {
            viewer.updateMoleculeRepresentation({type: structure3dRepresentation, coloring: structure3dColoring, uniformColor: uniformColor});
        }
    }, [structure3dRepresentation, structure3dColoring, uniformColor]);


    return (
        <div id={id}>
            <div id="viewer3d" ref={parent}/>
        </div>
    )
}

export default Viewer3D;
