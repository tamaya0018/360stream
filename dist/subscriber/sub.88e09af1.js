var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequirefbea;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequirefbea=i);var o=i("hlpVk");const a=new(0,o.SkyWayAuthToken)({jti:(0,o.uuidV4)(),iat:(0,o.nowInSec)(),exp:(0,o.nowInSec)()+86400,scope:{app:{id:"1194851a-7721-4348-951a-f502fd4dccb3",turn:!0,actions:["read"],channels:[{id:"*",name:"*",actions:["read"],members:[{id:"*",name:"*",actions:["write"],publication:{actions:["write"]},subscription:{actions:["write"]}}],sfuBots:[{actions:["write"],forwardings:[{actions:["write"]}]}]}]}}}).encode("zufyzTSf6JdsD1m4feyiG8id/aju8Hyh7ROgcyHeHKY=");(async()=>{const e=document.getElementById("button-area"),t=document.getElementById("remote-media-area"),n=document.getElementById("room-name"),i=document.getElementById("my-id");document.getElementById("join").onclick=async()=>{if(""===n.value)return;const d=await o.SkyWayContext.Create(a),r=await o.SkyWayRoom.FindOrCreate(d,{type:"p2p",name:n.value}),c=await r.join();i.textContent=c.id;const s=n=>{if(n.publisher.id===c.id)return;const i=document.createElement("button");i.textContent=`${n.publisher.id}: ${n.contentType}`,e.appendChild(i),i.onclick=async()=>{const{stream:e}=await c.subscribe(n.id);let i;"video"===e.track.kind&&(i=document.getElementById("video"),e.attach(i),t.appendChild(i))}};r.publications.forEach(s),r.onStreamPublished.add((e=>{s(e.publication)}))}})();
//# sourceMappingURL=sub.88e09af1.js.map
