"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./grainient.css";

interface GrainientProps {
  color1?: string; color2?: string; color3?: string; timeSpeed?: number; colorBalance?: number;
  warpStrength?: number; warpFrequency?: number; warpSpeed?: number; warpAmplitude?: number;
  blendAngle?: number; blendSoftness?: number; rotationAmount?: number; noiseScale?: number;
  grainAmount?: number; grainScale?: number; grainAnimated?: boolean; contrast?: number; gamma?: number;
  saturation?: number; centerX?: number; centerY?: number; zoom?: number; className?: string;
}

const toRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255] : [1, 1, 1];
};

const vertex = `#version 300 es
in vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution,uCenterOffset; uniform float iTime,uTimeSpeed,uColorBalance,uWarpStrength,uWarpFrequency,uWarpSpeed,uWarpAmplitude,uBlendAngle,uBlendSoftness,uRotationAmount,uNoiseScale,uGrainAmount,uGrainScale,uGrainAnimated,uContrast,uGamma,uSaturation,uZoom; uniform vec3 uColor1,uColor2,uColor3; out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i),f),dot(-1.0+2.0*hash(i+vec2(1.,0.)),f-vec2(1.,0.)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.,1.)),f-vec2(0.,1.)),dot(-1.0+2.0*hash(i+vec2(1.,1.)),f-vec2(1.,1.)),u.x),u.y);return .5+.5*n;}
void main(){float t=iTime*uTimeSpeed;vec2 uv=gl_FragCoord.xy/iResolution.xy;float ratio=iResolution.x/iResolution.y;vec2 tuv=uv-.5+uCenterOffset;tuv/=max(uZoom,.001);float degree=noise(vec2(t*.1,tuv.x*tuv.y)*uNoiseScale);tuv.y/=ratio;tuv*=Rot(radians((degree-.5)*uRotationAmount+180.));tuv.y*=ratio;float amplitude=uWarpAmplitude/max(uWarpStrength,.001),wt=t*uWarpSpeed;tuv.x+=sin(tuv.y*uWarpFrequency+wt)/amplitude;tuv.y+=sin(tuv.x*(uWarpFrequency*1.5)+wt)/(amplitude*.5);float s=max(uBlendSoftness,0.);float bx=(tuv*Rot(radians(uBlendAngle))).x;float e0=-.3-uColorBalance-s,e1=.2-uColorBalance+s;vec3 l1=mix(uColor3,uColor2,S(e0,e1,bx)),l2=mix(uColor2,uColor1,S(e0,e1,bx));vec3 col=mix(l1,l2,S(.5-uColorBalance+s,-.3-uColorBalance-s,tuv.y));vec2 guv=uv*max(uGrainScale,.001);if(uGrainAnimated>.5)guv+=vec2(iTime*.05);float grain=fract(sin(dot(guv,vec2(12.9898,78.233)))*43758.5453);col+=(grain-.5)*uGrainAmount;col=(col-.5)*uContrast+.5;float luma=dot(col,vec3(.2126,.7152,.0722));col=mix(vec3(luma),col,uSaturation);col=pow(max(col,0.),vec3(1./max(uGamma,.001)));fragColor=vec4(clamp(col,0.,1.),1.);}`;

export default function Grainient({
  color1 = "#FF9FFC", color2 = "#5227FF", color3 = "#B497CF", timeSpeed = .25, colorBalance = 0,
  warpStrength = 1, warpFrequency = 5, warpSpeed = 2, warpAmplitude = 50, blendAngle = 0,
  blendSoftness = .05, rotationAmount = 500, noiseScale = 2, grainAmount = .1, grainScale = 2,
  grainAnimated = false, contrast = 1.5, gamma = 1, saturation = 1, centerX = 0, centerY = 0,
  zoom = .9, className = "",
}: GrainientProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
    container.appendChild(canvas);
    const program = new Program(gl, { vertex, fragment, uniforms: {
      iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) }, uTimeSpeed: { value: timeSpeed }, uColorBalance: { value: colorBalance },
      uWarpStrength: { value: warpStrength }, uWarpFrequency: { value: warpFrequency }, uWarpSpeed: { value: warpSpeed }, uWarpAmplitude: { value: warpAmplitude },
      uBlendAngle: { value: blendAngle }, uBlendSoftness: { value: blendSoftness }, uRotationAmount: { value: rotationAmount }, uNoiseScale: { value: noiseScale },
      uGrainAmount: { value: grainAmount }, uGrainScale: { value: grainScale }, uGrainAnimated: { value: grainAnimated ? 1 : 0 }, uContrast: { value: contrast },
      uGamma: { value: gamma }, uSaturation: { value: saturation }, uCenterOffset: { value: new Float32Array([centerX, centerY]) }, uZoom: { value: zoom },
      uColor1: { value: new Float32Array(toRgb(color1)) }, uColor2: { value: new Float32Array(toRgb(color2)) }, uColor3: { value: new Float32Array(toRgb(color3)) },
    }});
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height))); const resolution = (program.uniforms.iResolution as { value: Float32Array }).value; resolution[0] = gl.drawingBufferWidth; resolution[1] = gl.drawingBufferHeight; };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    let frame = 0; let onScreen = true; let pageVisible = !document.hidden; const started = performance.now();
    const draw = (time: number) => { (program.uniforms.iTime as { value: number }).value = (time - started) / 1000; renderer.render({ scene: mesh }); frame = requestAnimationFrame(draw); };
    const start = () => { if (onScreen && pageVisible && !frame) frame = requestAnimationFrame(draw); };
    const stop = () => { if (frame) { cancelAnimationFrame(frame); frame = 0; } };
    const intersection = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; onScreen ? start() : stop(); });
    const visibility = () => { pageVisible = !document.hidden; pageVisible ? start() : stop(); };
    intersection.observe(container); document.addEventListener("visibilitychange", visibility); start();
    return () => { stop(); observer.disconnect(); intersection.disconnect(); document.removeEventListener("visibilitychange", visibility); canvas.remove(); };
  // The WebGL renderer is intentionally created once; its props are fixed for this card instance.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className={`grainient-container ${className}`.trim()} />;
}
