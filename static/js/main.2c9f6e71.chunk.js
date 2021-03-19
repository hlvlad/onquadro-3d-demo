(this["webpackJsonpmolstar-demo"]=this["webpackJsonpmolstar-demo"]||[]).push([[0],{305:function(e,t,a){},306:function(e,t,a){},321:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a.n(n),o=a(243),c=a.n(o),i=(a(305),a(185)),u=a(253),s=(a(306),a(255)),l=a.n(s),d=a(290),p=a(285),b=a(294),h=a(295),j=(a(308),a(195)),v=a(57),f=a(137),O=a(23);a(316);var m={layoutIsExpanded:!1,layoutShowControls:!0,layoutShowRemoteState:!1,layoutShowSequence:!0,layoutShowLeftPanel:!0,layoutControlsDisplay:"reactive",disableAntialiasing:!1,pixelScale:1,enableWboit:!1,viewportShowExpand:!0,viewportShowSelectionMode:!1,viewportShowAnimation:!1},w=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(b.a)(this,e),this.plugin=void 0,this.currentStructure=void 0;var n=Object(i.a)(Object(i.a)({},m),a),r=Object(i.a)(Object(i.a)({},j.a),{},{actions:Object(p.a)(j.a.actions),behaviors:Object(p.a)(j.a.behaviors),animations:Object(p.a)(j.a.animations||[]),customParamEditors:j.a.customParamEditors,layout:{initial:{isExpanded:n.layoutIsExpanded,showControls:n.layoutShowControls,controlsDisplay:n.layoutControlsDisplay},controls:Object(i.a)(Object(i.a)({},j.a.layout&&j.a.layout.controls),{},{top:n.layoutShowSequence?void 0:"none",left:n.layoutShowLeftPanel?void 0:"none",right:"none",bottom:"none"})},components:Object(i.a)(Object(i.a)({},j.a.components),{},{remoteState:"none"}),config:[[v.a.Viewport.ShowExpand,n.viewportShowExpand],[v.a.Viewport.ShowAnimation,n.viewportShowAnimation],[v.a.Viewport.ShowSelectionMode,n.viewportShowSelectionMode]]});this.plugin=Object(j.b)(t,r)}return Object(h.a)(e,[{key:"loadStructureFromData",value:function(){var e=Object(d.a)(l.a.mark((function e(t,a,n){var r,o,c,i,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.plugin.clear();case 2:return this.plugin.behaviors.layout.leftPanelTabName.next("data"),e.next=5,this.plugin.builders.data.rawData({data:t,label:null===n||void 0===n?void 0:n.dataLabel});case 5:return r=e.sent,e.next=8,this.plugin.builders.structure.parseTrajectory(r,a);case 8:return o=e.sent,e.next=11,this.plugin.builders.structure.createModel(o);case 11:if(c=e.sent){e.next=14;break}return e.abrupt("return");case 14:return e.next=16,this.plugin.builders.structure.createStructure(c);case 16:return i=e.sent,u=Object(f.b)(this.plugin,void 0,{type:"ball-and-stick",color:"chain-id",size:"uniform",sizeParams:{value:2}}),e.next=20,this.plugin.build().to(i).apply(O.a.Representation.StructureRepresentation3D,u).commit();case 20:this.currentStructure=e.sent;case 21:case"end":return e.stop()}}),e,this)})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"updateMoleculeRepresentation",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(f.b)(this.plugin,void 0,{type:t,color:"chain-id",size:"uniform",sizeParams:{value:2}}),console.log("Trying to update structure 3D Representation to ".concat(t)),e.next=4,this.plugin.build().to(this.currentStructure).update(a).commit();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),y=a(130),S=function(e){var t=e.id,a=e.structure3d,r=e.structure3dAppearance,o=Object(n.useRef)(null),c=Object(n.useState)(),i=Object(u.a)(c,2),s=i[0],l=i[1];return Object(n.useLayoutEffect)((function(){null!=o.current&&l(new w(o.current))}),[]),Object(n.useEffect)((function(){s&&a&&(console.log(a),s.loadStructureFromData(a,"mmcif"))}),[s,a]),Object(n.useEffect)((function(){s&&s.updateMoleculeRepresentation(r)}),[r]),Object(y.jsx)("div",{id:t,children:Object(y.jsx)("div",{id:"viewer3d",ref:o})})},x=a(228),g=a(300),k=a(280);var E=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)("ball-and-stick"),c=Object(u.a)(o,2),s=c[0],l=c[1];function d(e){l(e.target.value)}Object(n.useEffect)((function(){fetch("data/coordinates.cif").then((function(e){return e.text()})).then((function(e){r(e)})).catch((function(e){console.error(e)}))}),[]);var p={structure3d:a,structure3dAppearance:s};return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)("div",{id:"viewer3d-controls",children:Object(y.jsx)(x.a,{children:Object(y.jsx)("fieldset",{children:Object(y.jsxs)(x.a.Group,{as:g.a,children:[Object(y.jsx)(x.a.Label,{as:"legend",column:!0,sm:2,children:"3D structure appearance"}),Object(y.jsxs)(k.a,{sm:10,children:[Object(y.jsx)(x.a.Check,{type:"radio",label:"Ball and stick",checked:"ball-and-stick"===s,value:"ball-and-stick",onChange:d}),Object(y.jsx)(x.a.Check,{type:"radio",label:"Cartoon",checked:"cartoon"===s,value:"cartoon",onChange:d}),Object(y.jsx)(x.a.Check,{type:"radio",label:"Putty",checked:"putty"===s,value:"putty",onChange:d})]})]})})})}),Object(y.jsx)(S,Object(i.a)({id:"viewer3d-wrapper"},p))]})};c.a.render(Object(y.jsx)(r.a.StrictMode,{children:Object(y.jsx)(E,{})}),document.getElementById("root"))}},[[321,1,2]]]);
//# sourceMappingURL=main.2c9f6e71.chunk.js.map