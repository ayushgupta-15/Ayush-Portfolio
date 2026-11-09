"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { snippets } from "@/lib/snippets";
import { makePanelTexture } from "./panelTexture";

const CYAN = new THREE.Color("#22C7E8");
const VIOLET = new THREE.Color("#8B5CF6");
const BG = "#05080F";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (t: number) => {
  t = clamp01(t);
  return t * t * (3 - 2 * t);
};
const seg = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Camera z as a function of story progress. */
export function cameraZ(p: number) {
  const drift = 9 - 2 * seg(p, 0, 0.14);
  const dive = (drift - 0.3) * seg(p, 0.14, 0.28);
  let z = drift - dive;
  z -= 20.3 * seg(p, 0.28, 0.38);
  z -= 68 * seg(p, 0.38, 1.0) * 1;
  return z;
}

/* ---------- Hero chip, standing so the die faces the camera ---------- */

function buildTraces() {
  const r = rng(7);
  const paths: THREE.Vector3[][] = [];
  const half = 1.45;
  const board = 3.3;
  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 9; i++) {
      const along = -1.2 + (i * 2.4) / 8;
      const lead = 0.3 + r() * 0.5;
      const bend = (r() - 0.5) * 1.4;
      const tail = 0.5 + r() * 0.7;
      const pts: [number, number][] = [
        [half, along],
        [half + lead, along],
        [half + lead + Math.abs(bend), along + bend],
        [Math.min(board, half + lead + Math.abs(bend) + tail), along + bend],
      ];
      const a = (side * Math.PI) / 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      paths.push(pts.map(([u, v]) => new THREE.Vector3(u * c - v * s, 0.075, u * s + v * c)));
    }
  }
  return paths;
}

function Edges({ w, h, d, color, opacity = 0.5 }: { w: number; h: number; d: number; color: THREE.Color; opacity?: number }) {
  const geo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
    </lineSegments>
  );
}

function Chip({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const narrow = viewport.width < viewport.height;
  const dieMat = useRef<THREE.MeshStandardMaterial>(null);
  const traces = useMemo(buildTraces, []);
  const traceGeo = useMemo(() => {
    const pos: number[] = [];
    traces.forEach((p) => {
      for (let i = 0; i < p.length - 1; i++) pos.push(p[i].x, p[i].y, p[i].z, p[i + 1].x, p[i + 1].y, p[i + 1].z);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, [traces]);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lengths = useMemo(
    () =>
      traces.map((p) => {
        const s: number[] = [0];
        for (let i = 1; i < p.length; i++) s.push(s[i - 1] + p[i].distanceTo(p[i - 1]));
        return s;
      }),
    [traces],
  );
  const PULSES = 22;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;
    if (group.current) {
      const g = group.current;
      const away = seg(p, 0.06, 0.2);
      g.position.x = narrow ? 0 : 1.75 * (1 - away);
      g.position.y = narrow ? 1.1 * (1 - away) : 0;
      const sc = narrow ? 0.4 : 0.62;
      g.scale.setScalar(sc);
      g.rotation.x = Math.PI / 2 + (-state.pointer.y * 0.1) * (1 - away);
      g.rotation.y = 0;
      g.rotation.z = -0.55 * (1 - away) + state.pointer.x * 0.12 * (1 - away) + t * 0.03;
      g.rotation.x += -0.35 * (1 - away);
    }
    if (dieMat.current) dieMat.current.emissiveIntensity = 1.8 + Math.sin(t * 1.4) * 0.35 + seg(p, 0.1, 0.26) * 5;
    if (pulses.current) {
      for (let i = 0; i < PULSES; i++) {
        const pi = (i * 7) % traces.length;
        const path = traces[pi];
        const sg = lengths[pi];
        const total = sg[sg.length - 1];
        const d = ((t * (0.12 + ((i * 29) % 10) / 90) + i * 0.137) % 1) * total;
        let k = 1;
        while (k < sg.length - 1 && sg[k] < d) k++;
        const f = (d - sg[k - 1]) / (sg[k] - sg[k - 1] || 1);
        dummy.position.lerpVectors(path[k - 1], path[k], clamp01(f));
        dummy.updateMatrix();
        pulses.current.setMatrixAt(i, dummy.matrix);
      }
      pulses.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[7, 0.14, 7]} />
        <meshStandardMaterial color="#13213A" metalness={0.4} roughness={0.6} />
      </mesh>
      <Edges w={7} h={0.14} d={7} color={CYAN} opacity={0.35} />
      <lineSegments geometry={traceGeo}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.7} toneMapped={false} />
      </lineSegments>
      <instancedMesh ref={pulses} args={[undefined, undefined, PULSES]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={new THREE.Color("#9AEBFF").multiplyScalar(2.2)} toneMapped={false} />
      </instancedMesh>
      <group position={[0, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[3.0, 0.3, 3.0]} />
          <meshStandardMaterial color="#22345A" metalness={0.5} roughness={0.4} emissive="#0B2338" emissiveIntensity={0.5} />
        </mesh>
        <Edges w={3.0} h={0.3} d={3.0} color={CYAN} opacity={0.7} />
      </group>
      <group position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[1.8, 0.14, 1.8]} />
          <meshStandardMaterial ref={dieMat} color="#BFEFFF" emissive="#6FE3FF" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <Edges w={1.8} h={0.14} d={1.8} color={VIOLET} opacity={0.9} />
      </group>
    </group>
  );
}

/* ---------- Tunnel inside the die ---------- */

function Tunnel({ camZ }: { camZ: React.MutableRefObject<number> }) {
  const boxes = useRef<THREE.InstancedMesh>(null);
  const wrap = useRef<THREE.Group>(null);
  useFrame(() => {
    if (wrap.current) wrap.current.visible = camZ.current < 3.5 && camZ.current > -30;
  });
  const N = 260;
  const frames = 22;
  const frameGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 0.01)), []);

  useEffect(() => {
    if (!boxes.current) return;
    const r = rng(33);
    const d = new THREE.Object3D();
    const col = new THREE.Color();
    const palette = ["#1D5BFF", "#2E8BFF", "#22C7E8", "#7AD8FF", "#4B6BFF"];
    for (let i = 0; i < N; i++) {
      const side = Math.floor(r() * 4);
      const wall = 1.35 + r() * 0.35;
      const lat = (r() - 0.5) * 3.2;
      const z = -0.5 - r() * 21;
      const len = 0.3 + r() * 1.6;
      const thick = 0.1 + r() * 0.5;
      const wide = 0.2 + r() * 0.9;
      if (side < 2) {
        d.position.set(side === 0 ? wall : -wall, lat, z);
        d.scale.set(thick, wide, len);
      } else {
        d.position.set(lat, side === 2 ? wall : -wall, z);
        d.scale.set(wide, thick, len);
      }
      d.updateMatrix();
      boxes.current.setMatrixAt(i, d.matrix);
      col.set(palette[Math.floor(r() * palette.length)]).multiplyScalar(0.7 + r() * 1.6);
      boxes.current.setColorAt(i, col);
    }
    boxes.current.instanceMatrix.needsUpdate = true;
    if (boxes.current.instanceColor) boxes.current.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group ref={wrap} visible={false}>
      <instancedMesh ref={boxes} args={[undefined, undefined, N]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {Array.from({ length: frames }).map((_, i) => (
        <lineSegments key={i} geometry={frameGeo} position={[0, 0, -1 - i * 1.0]} scale={[3.4 - (i % 3) * 0.25, 3.4 - (i % 3) * 0.25, 1]}>
          <lineBasicMaterial color={CYAN} transparent opacity={0.55} toneMapped={false} />
        </lineSegments>
      ))}
    </group>
  );
}

/* ---------- Floating code panels ---------- */

type PanelDef = { snippet: number; pos: [number, number, number]; rot: [number, number, number]; w: number; phase: number };

function Panels({ camZ, lite }: { camZ: React.MutableRefObject<number>; lite: boolean }) {
  const { viewport } = useThree();
  const narrow = viewport.width < viewport.height;
  const refs = useRef<(THREE.Group | null)[]>([]);
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const lines = useRef<(THREE.LineBasicMaterial | null)[]>([]);

  const textures = useMemo(() => snippets.map((s) => makePanelTexture(s)), []);

  const defs = useMemo<PanelDef[]>(() => {
    const r = rng(91);
    const zones: [number, number][] = [
      [-27, -45],
      [-49, -67],
      [-70, -88],
    ];
    const out: PanelDef[] = [];
    zones.forEach((z, zi) => {
      const chapterIdx = snippets.map((s, i) => (s.chapter === zi + 1 ? i : -1)).filter((i) => i >= 0);
      for (let k = 0; k < (lite ? 7 : 9); k++) {
        const ang = r() * Math.PI * 2;
        const rad = 2.8 + r() * 4.2;
        out.push({
          snippet: chapterIdx[k % chapterIdx.length],
          pos: [Math.cos(ang) * rad * (narrow ? 0.34 : 1.35), Math.sin(ang) * rad * (narrow ? 0.7 : 0.65), z[0] + (z[1] - z[0]) * r()],
          rot: [(r() - 0.5) * 0.35, (r() - 0.5) * 0.9, (r() - 0.5) * 0.25],
          w: (2.4 + r() * 2.2) * (narrow ? 0.9 : 1),
          phase: r() * 6.28,
        });
      }
    });
    return out;
  }, [lite, narrow]);

  const frameGeos = useMemo(() => defs.map((d) => {
    const a = textures[d.snippet].aspect;
    return new THREE.EdgesGeometry(new THREE.PlaneGeometry(d.w, d.w * a));
  }), [defs, textures]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const z0 = camZ.current;
    defs.forEach((d, i) => {
      const g = refs.current[i];
      if (!g) return;
      const dist = z0 - d.pos[2]; // positive while the panel is still ahead of the camera
      const fadeIn = 1 - smooth((dist - 15) / 9);
      const fadeOut = smooth((dist + 0.5) / 3);
      const o = Math.min(fadeIn, fadeOut);
      g.visible = o > 0.01;
      g.position.y = d.pos[1] + Math.sin(t * 0.5 + d.phase) * 0.12;
      g.rotation.set(d.rot[0], d.rot[1] + Math.sin(t * 0.25 + d.phase) * 0.06, d.rot[2]);
      const m = mats.current[i];
      if (m) m.opacity = o * 0.95;
      const l = lines.current[i];
      if (l) l.opacity = o * 0.8;
    });
  });

  return (
    <group>
      {defs.map((d, i) => {
        const a = textures[d.snippet].aspect;
        return (
          <group key={i} ref={(el) => { refs.current[i] = el; }} position={d.pos}>
            <mesh>
              <planeGeometry args={[d.w, d.w * a]} />
              <meshBasicMaterial ref={(el) => { mats.current[i] = el; }} map={textures[d.snippet].texture} transparent toneMapped={false} depthWrite={false} side={THREE.DoubleSide} />
            </mesh>
            <lineSegments geometry={frameGeos[i]}>
              <lineBasicMaterial ref={(el) => { lines.current[i] = el; }} color={CYAN} transparent toneMapped={false} />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}

function Stars({ lite }: { lite: boolean }) {
  const geo = useMemo(() => {
    const r = rng(5);
    const N = lite ? 1200 : 2600;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [new THREE.Color("#CFE8FF"), CYAN, VIOLET, new THREE.Color("#FFFFFF"), new THREE.Color("#FF6B8A")];
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (r() - 0.5) * 26;
      pos[i * 3 + 1] = (r() - 0.5) * 16;
      pos[i * 3 + 2] = 4 - r() * 96;
      const c = palette[Math.floor(r() * palette.length)];
      const k = 0.5 + r() * 1.4;
      col[i * 3] = c.r * k;
      col[i * 3 + 1] = c.g * k;
      col[i * 3 + 2] = c.b * k;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [lite]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.05} sizeAttenuation vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

function Rig({ progress, onReady, onChapterZ, lite }: { progress: MotionValue<number>; onReady: () => void; onChapterZ: React.MutableRefObject<number>; lite: boolean }) {
  const sp = useRef(0);
  const camZ = onChapterZ;
  const readyFired = useRef(false);
  const ca = useRef<{ offset: THREE.Vector2 } | null>(null);
  const prev = useRef(0);
  const { camera } = useThree();

  useFrame((state, dt) => {
    const target = progress.get();
    sp.current += (target - sp.current) * Math.min(1, dt * 4.5);
    const vel = Math.abs(sp.current - prev.current) / Math.max(dt, 0.001);
    prev.current = sp.current;
    const z = cameraZ(sp.current);
    camZ.current = z;
    camera.position.set(state.pointer.x * 0.35, state.pointer.y * 0.2, z);
    camera.rotation.set(-state.pointer.y * 0.03, -state.pointer.x * 0.05, Math.sin(state.clock.elapsedTime * 0.2) * 0.01 + seg(sp.current, 0.28, 0.38) * Math.sin(sp.current * 40) * 0.01);
    if (ca.current) {
      const k = 0.0006 + Math.min(0.0035, vel * 0.022);
      ca.current.offset.set(k, k);
    }
    if (!readyFired.current && state.clock.elapsedTime > 0.2) {
      readyFired.current = true;
      onReady();
    }
  });

  if (lite) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.8} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur radius={0.6} />
        <Vignette eskil={false} offset={0.2} darkness={0.6} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.9} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur radius={0.6} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ChromaticAberration ref={ca as any} offset={new THREE.Vector2(0.0006, 0.0006)} radialModulation={false} modulationOffset={0} />
      <Vignette eskil={false} offset={0.2} darkness={0.7} />
    </EffectComposer>
  );
}

function Scene({ progress, onReady, lite }: { progress: MotionValue<number>; onReady: () => void; lite: boolean }) {
  const smoothP = useRef(0);
  const camZ = useRef(9);
  useFrame((_, dt) => {
    smoothP.current += (progress.get() - smoothP.current) * Math.min(1, dt * 4.5);
  });
  return (
    <>
      <color attach="background" args={[BG]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} color="#bfe9ff" />
      <pointLight position={[-4, 2, 2]} intensity={14} color="#8B5CF6" distance={14} />
      <Chip progress={smoothP} />
      <Tunnel camZ={camZ} />
      <Panels camZ={camZ} lite={lite} />
      <Stars lite={lite} />
      <Rig progress={progress} onReady={onReady} onChapterZ={camZ} lite={lite} />
    </>
  );
}

export default function World({ progress, active, onReady, lite = false }: { progress: MotionValue<number>; active: boolean; onReady: () => void; lite?: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0, 9], fov: lite ? 58 : 45, near: 0.1, far: 140 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      aria-hidden
    >
      <Scene progress={progress} onReady={onReady} lite={lite} />
    </Canvas>
  );
}
