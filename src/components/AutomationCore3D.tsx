import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type BlueprintMode = 'lead-triage' | 'ai-receptionist' | 'content-engine';

interface AutomationCore3DProps {
  theme: 'dark' | 'light';
  mode: BlueprintMode;
}

const _vec3B = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function AutomationCore3D({ theme, mode }: AutomationCore3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef(theme);
  const modeRef = useRef(mode);
  const [contextLost, setContextLost] = useState(false);

  themeRef.current = theme;
  modeRef.current = mode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const disposables: Array<{ dispose: () => void }> = [];

    const scene = new THREE.Scene();
    const initialDark = themeRef.current === 'dark';
    const bgHex = initialDark ? 0x050914 : 0xf1f5f9;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.045);

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    // Studio environment reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    disposables.push(envTexture);
    pmremGenerator.dispose();

    // 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(4.5, 6.5, 5.0);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const cyanRimLight = new THREE.PointLight(0x14b8ff, 5.5, 16, 1.6);
    cyanRimLight.position.set(-3.6, 2.2, -2.2);
    scene.add(cyanRimLight);

    const indigoRimLight = new THREE.PointLight(0x5b6cf9, 4.5, 16, 1.6);
    indigoRimLight.position.set(3.5, -1.2, -2.5);
    scene.add(indigoRimLight);

    // Orbit Controls (no scroll hijack)
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.autoRotate = !isSoftwareGl;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.66;
    controls.target.set(0, 0.05, 0);

    // ==================== MATERIALS ====================
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
    });

    const brushedAlloyMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.3,
      anisotropy: 0.75,
    });

    const cyanAccentMat = new THREE.MeshPhysicalMaterial({
      color: 0x14b8ff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
      metalness: 0.3,
      roughness: 0.18,
      clearcoat: 1.0,
    });

    const indigoAccentMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x4338ca,
      emissiveIntensity: 0.75,
      metalness: 0.35,
      roughness: 0.2,
      clearcoat: 0.9,
    });

    const coreCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.45,
      metalness: 0.1,
      roughness: 0.08,
      ior: 1.68,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      iridescence: 0.65,
      iridescenceIOR: 1.3,
      transmission: isSoftwareGl ? 0 : 0.72,
      thickness: 1.4,
      transparent: true,
      opacity: isSoftwareGl ? 0.82 : 1,
    });

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.75,
      roughness: 0.38,
    });

    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    disposables.push(
      titaniumMat,
      brushedAlloyMat,
      cyanAccentMat,
      indigoAccentMat,
      coreCrystalMat,
      coreWireMat,
      conduitMat,
      packetMat
    );

    // ==================== PROCEDURAL COMPOSITE 3D ENGINE ====================
    const engineGroup = new THREE.Group();
    scene.add(engineGroup);

    // 1. Central Faceted AI Core (crystal + inner wireframe + core lattice)
    const coreGroup = new THREE.Group();
    engineGroup.add(coreGroup);

    const crystalGeo = new THREE.IcosahedronGeometry(0.76, 1);
    const crystalMesh = new THREE.Mesh(crystalGeo, coreCrystalMat);
    crystalMesh.castShadow = true;
    coreGroup.add(crystalMesh);

    const wireGeo = new THREE.IcosahedronGeometry(0.92, 1);
    const wireMesh = new THREE.Mesh(wireGeo, coreWireMat);
    coreGroup.add(wireMesh);

    const innerSphereGeo = new THREE.OctahedronGeometry(0.36, 0);
    const innerSphere = new THREE.Mesh(innerSphereGeo, cyanAccentMat);
    coreGroup.add(innerSphere);

    disposables.push(crystalGeo, wireGeo, innerSphereGeo);

    // 2. Precision Beveled Stator Chassis (ExtrudeGeometry octagonal collar)
    const octShape = new THREE.Shape();
    const outerR = 1.24;
    const innerR = 1.06;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const x = Math.cos(a) * outerR;
      const y = Math.sin(a) * outerR;
      if (i === 0) octShape.moveTo(x, y);
      else octShape.lineTo(x, y);
    }
    octShape.closePath();

    const holePath = new THREE.Path();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const x = Math.cos(a) * innerR;
      const y = Math.sin(a) * innerR;
      if (i === 0) holePath.moveTo(x, y);
      else holePath.lineTo(x, y);
    }
    holePath.closePath();
    octShape.holes.push(holePath);

    const chassisGeo = new THREE.ExtrudeGeometry(octShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    });
    chassisGeo.center();
    const chassisMesh = new THREE.Mesh(chassisGeo, titaniumMat);
    chassisMesh.rotation.x = Math.PI * 0.35;
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    engineGroup.add(chassisMesh);
    disposables.push(chassisGeo);

    // 3. Three Counter-Rotating Orbital Automation Rings (n8n, Make, Zapier)
    const ring1Geo = new THREE.TorusGeometry(1.52, 0.032, 20, 96);
    const ring1 = new THREE.Mesh(ring1Geo, brushedAlloyMat);
    ring1.rotation.set(Math.PI * 0.38, Math.PI * 0.12, 0);
    engineGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.88, 0.026, 20, 96);
    const ring2 = new THREE.Mesh(ring2Geo, cyanAccentMat);
    ring2.rotation.set(-Math.PI * 0.28, Math.PI * 0.32, 0.3);
    engineGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.18, 0.022, 16, 96);
    const ring3 = new THREE.Mesh(ring3Geo, indigoAccentMat);
    ring3.rotation.set(Math.PI * 0.18, -Math.PI * 0.25, -0.4);
    engineGroup.add(ring3);

    disposables.push(ring1Geo, ring2Geo, ring3Geo);

    // 4. Six Composite Workflow Node Satellites + Curved Data Conduits
    const nodeBaseGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.11, 16);
    const nodeCapGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.14, 16);
    const nodeCollarGeo = new THREE.TorusGeometry(0.18, 0.022, 12, 24);
    disposables.push(nodeBaseGeo, nodeCapGeo, nodeCollarGeo);

    const nodePositions: THREE.Vector3[] = [
      new THREE.Vector3(2.05, 0.62, 0.45),
      new THREE.Vector3(-2.05, 0.45, 0.55),
      new THREE.Vector3(1.42, -0.82, 1.12),
      new THREE.Vector3(-1.48, -0.78, -0.95),
      new THREE.Vector3(0.45, 1.38, -1.25),
      new THREE.Vector3(-0.42, -1.25, 1.35),
    ];

    const satelliteNodes: THREE.Group[] = [];
    const curves: THREE.CatmullRomCurve3[] = [];

    nodePositions.forEach((pos, idx) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const base = new THREE.Mesh(nodeBaseGeo, titaniumMat);
      base.castShadow = true;
      nodeGroup.add(base);

      const cap = new THREE.Mesh(
        nodeCapGeo,
        idx % 2 === 0 ? cyanAccentMat : indigoAccentMat
      );
      cap.position.y = 0.02;
      nodeGroup.add(cap);

      const collar = new THREE.Mesh(nodeCollarGeo, brushedAlloyMat);
      collar.rotation.x = Math.PI / 2;
      nodeGroup.add(collar);

      nodeGroup.lookAt(0, 0, 0);
      nodeGroup.rotateX(Math.PI / 2);

      engineGroup.add(nodeGroup);
      satelliteNodes.push(nodeGroup);

      // Curved data conduit from core surface to node
      const mid = pos.clone().multiplyScalar(0.52);
      mid.y += idx % 2 === 0 ? 0.35 : -0.3;
      const curve = new THREE.CatmullRomCurve3([
        pos.clone().normalize().multiplyScalar(0.75),
        mid,
        pos.clone(),
      ]);
      curves.push(curve);

      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.016, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, conduitMat);
      engineGroup.add(tubeMesh);
      disposables.push(tubeGeo);
    });

    // 5. Instanced Data Packets flowing along conduits (18 packets)
    const packetCount = curves.length * 3;
    const packetGeo = new THREE.SphereGeometry(0.042, 12, 12);
    const packetInstanced = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    packetInstanced.frustumCulled = false;
    engineGroup.add(packetInstanced);
    disposables.push(packetGeo);

    // 6. Grounded Calibration Base & Radial Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 128);
      grad.addColorStop(0, 'rgba(20, 184, 255, 0.28)');
      grad.addColorStop(0.45, 'rgba(15, 23, 42, 0.36)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(5.6, 5.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.05;
    scene.add(shadowPlane);

    const floorRingGeo = new THREE.RingGeometry(2.1, 2.13, 72);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x14b8ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -2.03;
    scene.add(floorRing);

    // 7. Ambient Orbital Depth Constellation (72 circular micro-nodes)
    const dustCount = 72;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 2.65 + (i % 7) * 0.32;
      const theta = i * 2.39996;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dustCount);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.cos(phi) * 0.65;
      dustPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustSpriteCanvas = document.createElement('canvas');
    dustSpriteCanvas.width = 64;
    dustSpriteCanvas.height = 64;
    const dustCtx = dustSpriteCanvas.getContext('2d');
    if (dustCtx) {
      const dGrad = dustCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      dGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      dGrad.addColorStop(0.45, 'rgba(125, 211, 252, 0.65)');
      dGrad.addColorStop(1, 'rgba(125, 211, 252, 0)');
      dustCtx.fillStyle = dGrad;
      dustCtx.fillRect(0, 0, 64, 64);
    }
    const dustTex = new THREE.CanvasTexture(dustSpriteCanvas);
    dustTex.colorSpace = THREE.SRGBColorSpace;

    const dustMat = new THREE.PointsMaterial({
      size: 0.085,
      map: dustTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    disposables.push(shadowTex, shadowGeo, shadowMat, floorRingGeo, floorRingMat, dustGeo, dustTex, dustMat);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // ResizeObserver for crisp responsive HD viewport
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 280);
      const h = Math.max(container.clientHeight, 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // WebGL Context Loss Recovery
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    // Animation Loop with zero GC allocations & software-GL pacing
    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    let speedMultiplier = 1;
    let currentThemeHex = bgHex;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      // Sync theme background & fog smoothly
      const desiredBg = themeRef.current === 'dark' ? 0x050914 : 0xf1f5f9;
      if (desiredBg !== currentThemeHex) {
        currentThemeHex = desiredBg;
        (scene.background as THREE.Color).setHex(desiredBg);
        if (scene.fog instanceof THREE.FogExp2) {
          scene.fog.color.setHex(desiredBg);
        }
        titaniumMat.color.setHex(themeRef.current === 'dark' ? 0x1e293b : 0x334155);
      }

      // Mode-specific orbital speed & accent tuning
      const targetSpeed =
        modeRef.current === 'lead-triage'
          ? 1.0
          : modeRef.current === 'ai-receptionist'
            ? 1.45
            : 0.78;
      speedMultiplier = THREE.MathUtils.damp(speedMultiplier, targetSpeed, 4, delta);

      const activeHue =
        modeRef.current === 'lead-triage'
          ? 0x14b8ff
          : modeRef.current === 'ai-receptionist'
            ? 0x38bdf8
            : 0x818cf8;
      packetMat.color.setHex(activeHue);

      // Smooth orbital rotations
      coreGroup.rotation.y += delta * 0.42 * speedMultiplier;
      coreGroup.rotation.x = Math.sin(elapsed * 0.65) * 0.16;
      wireMesh.rotation.y -= delta * 0.35 * speedMultiplier;
      innerSphere.rotation.z += delta * 0.8 * speedMultiplier;

      chassisMesh.rotation.z += delta * 0.14 * speedMultiplier;
      ring1.rotation.z += delta * 0.36 * speedMultiplier;
      ring2.rotation.x += delta * 0.28 * speedMultiplier;
      ring2.rotation.y -= delta * 0.22 * speedMultiplier;
      ring3.rotation.y += delta * 0.24 * speedMultiplier;

      engineGroup.position.y = Math.sin(elapsed * 1.1) * 0.08;
      dustPoints.rotation.y += delta * 0.08 * speedMultiplier;

      // Subtle breathing on satellite nodes
      for (let i = 0; i < satelliteNodes.length; i++) {
        const sat = satelliteNodes[i];
        const pulse = 1 + Math.sin(elapsed * 2.2 + i * 1.1) * 0.06;
        sat.scale.setScalar(pulse);
      }

      // Update instanced data packets along curved conduits (zero allocation)
      let instanceIdx = 0;
      for (let c = 0; c < curves.length; c++) {
        const curve = curves[c];
        for (let p = 0; p < 3; p++) {
          const t = (elapsed * 0.38 * speedMultiplier + c * 0.17 + p * 0.33) % 1;
          curve.getPointAt(t, _vec3B);
          const s = Math.sin(t * Math.PI) * 1.15 + 0.35;
          _scale.setScalar(s);
          _quat.identity();
          _mat4.compose(_vec3B, _quat, _scale);
          packetInstanced.setMatrixAt(instanceIdx, _mat4);
          instanceIdx++;
        }
      }
      packetInstanced.instanceMatrix.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      controls.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  if (contextLost) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--bg)] text-xs text-[var(--text-muted)] p-6 text-center">
        3D Viewport paused — restoring hardware context.
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
