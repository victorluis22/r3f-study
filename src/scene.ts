import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    scene: any;
    camera:any;
    renderer:any;
    fov: any;
    nearPlane: any;
    farPlane: any;
    canvasId: string;
    clock: any;
    stats: any;
    controls: any;
    ambientLight: any;
    directionalLight: any;
    width: number;
    height: number;
    backgroundColor: string;
    showStats: boolean;
    allowMovement: boolean;
    showAxis: boolean;
    changeWidth: Function;
    changeHeight: Function;
    allowResize: boolean;

  constructor(
    canvasId: string, 
    width: number | null | undefined, 
    height: number | null | undefined,
    changeWidth: Function,
    changeHeight: Function,
    allowResize: boolean,
    showStats: boolean | null | undefined,
    allowMovement: boolean | null | undefined,
    showAxis: boolean | null | undefined,
    backgroundColor: string | null | undefined
  ) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;
    this.width = width ?? window.innerWidth;
    this.height = height ?? window.innerHeight;
    this.changeWidth = changeWidth;
    this.changeHeight = changeHeight;
    this.allowResize = allowResize

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.showStats = showStats ?? false;
    this.allowMovement = allowMovement ?? false;
    this.controls = undefined;
    this.backgroundColor = backgroundColor ?? '#000';
    this.showAxis = showAxis ?? false

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    
    if(this.backgroundColor){
        this.scene.background = new THREE.Color( this.backgroundColor );
    }

    if(this.showAxis){
        const axesHelper = new THREE.AxesHelper( 10 );
        this.scene.add( axesHelper );
    }

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.z = 48;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId) ?? undefined;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
      alpha: this.backgroundColor ? false : true
    });
    this.renderer.setSize(this.width, this.height);
    // this.renderer.shadowMap.enabled = true;
    // document.body.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();

    if(this.allowMovement) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    
    if(this.showStats){
      this.stats = Stats();
      document.body.appendChild(this.stats.dom);
    }

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    if(this.allowResize){
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();

    if(this.showStats){
      this.stats.update();
    }
    if(this.allowMovement){
      this.controls.update();
    }
    
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);

    // Serve para forçar renderização do componente de novo
    this.changeWidth(window.innerWidth)
    this.changeHeight(window.innerHeight)
  }
}