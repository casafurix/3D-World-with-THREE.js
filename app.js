function main() {
  //scene, camera, renderer -> 3 musts!
  const canvas = document.querySelector("#c");

  //camera
  const fov = 75;
  //   const aspect = 2;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 2000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;

  //renderer
  const renderer = new THREE.WebGLRenderer({ canvas });

  //orbiter
  new THREE.OrbitControls(camera, canvas);

  //scene
  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const texture = loader.load("Camp_Nou_360.jpg", () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt.texture;
  });

  function render() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
