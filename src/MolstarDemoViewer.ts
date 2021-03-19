import "molstar/lib/mol-util/polyfill";
import { createPlugin, DefaultPluginSpec } from "molstar/lib/mol-plugin";
import { PluginContext } from "molstar/lib/mol-plugin/context";
import { PluginSpec } from "molstar/lib/mol-plugin/spec";
import { PluginLayoutControlsDisplay } from "molstar/lib/mol-plugin/layout";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
import { createStructureRepresentationParams } from "molstar/lib/mol-plugin-state/helpers/structure-representation-params";
import { StateTransforms } from "molstar/lib/mol-plugin-state/transforms";
import {
  applyBuiltInSelection,
} from "molstar/lib/mol-plugin-state/helpers/structure-selection-query";

require("molstar/lib/mol-plugin-ui/skin/light.scss");


const DefaultViewerOptions = {
  layoutIsExpanded: false,
  layoutShowControls: true,
  layoutShowRemoteState: false,
  layoutShowSequence: true,
  layoutShowLeftPanel: true,
  layoutControlsDisplay: "reactive" as PluginLayoutControlsDisplay,
  disableAntialiasing: false,
  pixelScale: 1,
  enableWboit: false,

  viewportShowExpand: true,
  viewportShowSelectionMode: false,
  viewportShowAnimation: false
};
type ViewerOptions = typeof DefaultViewerOptions;

export class MolstarDemoViewer {
  plugin: PluginContext;
  currentStructure: any;

  constructor(element: HTMLElement, options: Partial<ViewerOptions> = {}) {
    const o = { ...DefaultViewerOptions, ...options };
    const spec: PluginSpec = {
      ...DefaultPluginSpec,
      actions: [...DefaultPluginSpec.actions],
      behaviors: [...DefaultPluginSpec.behaviors],
      animations: [...DefaultPluginSpec.animations || []],
      customParamEditors: DefaultPluginSpec.customParamEditors,
      layout: {
        initial: {
          isExpanded: o.layoutIsExpanded,
          showControls: o.layoutShowControls,
          controlsDisplay: o.layoutControlsDisplay
        },
        controls: {
          ...DefaultPluginSpec.layout && DefaultPluginSpec.layout.controls,
          top: o.layoutShowSequence ? undefined : "none",
          left: o.layoutShowLeftPanel ? undefined : "none",
          right: "none",
          bottom: "none"
        }
      },
      components: {
        ...DefaultPluginSpec.components,
        remoteState: "none"
      },
      config: [
        [PluginConfig.Viewport.ShowExpand, o.viewportShowExpand],
        [PluginConfig.Viewport.ShowAnimation, o.viewportShowAnimation],
        [PluginConfig.Viewport.ShowSelectionMode, o.viewportShowSelectionMode]
      ]
    }
    this.plugin = createPlugin(element, spec);
  }

  async loadStructureFromData(data: string | ArrayBuffer, format: BuiltInTrajectoryFormat, options?: { dataLabel?: string, structureRepresentation3D: string }) {
    await this.plugin.clear();
    this.plugin.behaviors.layout.leftPanelTabName.next("data");
    const _data = await this.plugin.builders.data.rawData({ data, label: options?.dataLabel });
    const trajectory = await this.plugin.builders.structure.parseTrajectory(_data, format);
    const model = await this.plugin.builders.structure.createModel(trajectory);
    if (!model) return;
    const structure = await this.plugin.builders.structure.createStructure(model);
    const repr = createStructureRepresentationParams(this.plugin, void 0, {
      type: 'ball-and-stick',
      color: 'chain-id',
      size: 'uniform',
      sizeParams: {value: 2.0}
    });
    this.currentStructure = await this.plugin.build().to(structure).apply(StateTransforms.Representation.StructureRepresentation3D, repr).commit();
  }

  async updateMoleculeRepresentation(type: "ball-and-stick" | "cartoon" | "putty") {
    const newRepresenation = createStructureRepresentationParams(this.plugin, void 0, {
      type: type,
      color: 'chain-id',
      size: 'uniform',
      sizeParams: {value: 2.0}
    });
    console.log(`Trying to update structure 3D Representation to ${type}`)
    await this.plugin.build().to(this.currentStructure).update(newRepresenation).commit();
  }
}
