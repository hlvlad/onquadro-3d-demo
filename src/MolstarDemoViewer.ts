import "molstar/lib/mol-util/polyfill";
import {PluginConfig} from "molstar/lib/mol-plugin/config";
import {BuiltInTrajectoryFormat} from "molstar/lib/mol-plugin-state/formats/trajectory";
import {
    createStructureRepresentationParams,
    StructureRepresentationBuiltInProps
} from "molstar/lib/mol-plugin-state/helpers/structure-representation-params";
import {StateTransforms} from "molstar/lib/mol-plugin-state/transforms";
import {PluginUIContext} from "molstar/lib/mol-plugin-ui/context";
import {DefaultPluginUISpec, PluginUISpec} from "molstar/lib/mol-plugin-ui/spec";
import {createPlugin} from "molstar/lib/mol-plugin-ui";
import {Color} from "molstar/lib/mol-util/color";

function HEXToVBColor(rrggbb: string) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
}

type RepresentationParams = {
    type: "ball-and-stick" | "cartoon" | "putty",
    coloring: "uniform" | "element-symbol",
    uniformColor: {r: number, g: number, b: number}
}

export class MolstarDemoViewer {
    plugin: PluginUIContext;
    currentStructure: any;

    constructor(element: HTMLElement) {
        const spec: PluginUISpec = {
            ...DefaultPluginUISpec(),
            layout: {
                initial: {
                    isExpanded: false,
                    showControls: true,
                    controlsDisplay: "reactive"
                },
            },
            components: {
                remoteState: "none"
            },
            config: [
                [PluginConfig.Viewport.ShowExpand, true],
                [PluginConfig.Viewport.ShowAnimation, false],
                [PluginConfig.Viewport.ShowSelectionMode, false]
            ]
        }
        this.plugin = createPlugin(element, spec);
    }

    async loadStructureFromData(data: string | ArrayBuffer, format: BuiltInTrajectoryFormat, reprParams: RepresentationParams) {
        await this.plugin.clear();
        console.log("Loading...");
        this.plugin.behaviors.layout.leftPanelTabName.next("data");

        const _data = await this.plugin.builders.data.rawData({data});
        const trajectory = await this.plugin.builders.structure.parseTrajectory(_data, format);

        const model = await this.plugin.builders.structure.createModel(trajectory);
        if (!model) return;
        const structure = await this.plugin.builders.structure.createStructure(model);
        const {type, coloring, uniformColor} = reprParams;
        let props: StructureRepresentationBuiltInProps = {
            type: type,
            color: coloring,
            size: 'uniform',
            sizeParams: {value: 2.0}
        }
        if (coloring === 'uniform') {
            props.colorParams = { value: Color.fromRgb(uniformColor.r, uniformColor.g, uniformColor.b)}
        }
        const repr = createStructureRepresentationParams(this.plugin, void 0, props);
        this.currentStructure = await this.plugin.build().to(structure).apply(StateTransforms.Representation.StructureRepresentation3D, repr).commit();
    }

    async updateMoleculeRepresentation(reprParams: RepresentationParams) {
        const {type, coloring, uniformColor} = reprParams;
        let props: StructureRepresentationBuiltInProps = {
            type: type,
            color: coloring,
            size: 'uniform',
            sizeParams: {value: 2.0}
        }
        if (coloring === 'uniform') {
            props.colorParams = { value: Color.fromRgb(uniformColor.r, uniformColor.g, uniformColor.b)}
        }
        const newRepresenation = createStructureRepresentationParams(this.plugin, void 0, props);
        console.log(`Trying to update structure 3D Representation to ${type}`)
        await this.plugin.build().to(this.currentStructure).update(newRepresenation).commit();
    }

    dispose() {
        this.plugin?.dispose();
    }
}
