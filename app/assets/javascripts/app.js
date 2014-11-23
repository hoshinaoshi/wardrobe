$(function() {

			var container, stats;

			var camera, cameraTarget, scene, renderer, mesh, geometry, material;
    
                        var matchingContainer = $("#matching-container");
                        var windowWidth = matchingContainer.width();
                        var windowHeight = matchingContainer.height();

			init();
			animate();

			function init() {

				//container = document.createElement( 'div' );
				//document.body.appendChild( container );
				container = document.createElement( 'div' );
				matchingContainer.append( container );

				camera = new THREE.PerspectiveCamera( 35, windowWidth / windowHeight, 1, 15 );
				camera.position.set( 3, 0.15, 3 );

				cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


				// Ground

				var plane = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), new THREE.MeshPhongMaterial( { ambient: 0x999999, color: 0x999999, specular: 0x101010 } ) );
				plane.rotation.x = -Math.PI/2;
				plane.position.y = -0.5;
				scene.add( plane );

				plane.receiveShadow = true;


				// PLY file

				var loader = new THREE.PLYLoader();
				loader.addEventListener( 'load', function ( event ) {

					geometry = event.content;
					material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
					mesh = new THREE.Mesh( geometry, material );

					mesh.position.set( 0, - 0.75, 0 );
					mesh.rotation.set( 0, - Math.PI / 2, 0 );
					mesh.scale.set( 0.001, 0.001, 0.001 );

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					scene.add( mesh );

				} );
                                loader.load( '/assets/obj/gati.ply' );
                                //loader.load( '/assets/obj/test.ply' );

                                // Lights

				scene.add( new THREE.AmbientLight( 0x777777 ) );

				addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
				addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );

				// renderer

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setSize( windowWidth, windowHeight );

				renderer.setClearColor( scene.fog.color, 1 );

				renderer.gammaInput = true;
				renderer.gammaOutput = true;

				renderer.shadowMapEnabled = true;
				renderer.shadowMapCullFace = THREE.CullFaceBack;

				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function addShadowedLight( x, y, z, color, intensity ) {

				var directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z )
				scene.add( directionalLight );

				directionalLight.castShadow = true;
				// directionalLight.shadowCameraVisible = true;

				var d = 1;
				directionalLight.shadowCameraLeft = -d;
				directionalLight.shadowCameraRight = d;
				directionalLight.shadowCameraTop = d;
				directionalLight.shadowCameraBottom = -d;

				directionalLight.shadowCameraNear = 1;
				directionalLight.shadowCameraFar = 4;

				directionalLight.shadowMapWidth = 1024;
				directionalLight.shadowMapHeight = 1024;

				directionalLight.shadowBias = -0.005;
				directionalLight.shadowDarkness = 0.15;

			}

			function onWindowResize() {

				camera.aspect = windowWidth / windowHeight;
				camera.updateProjectionMatrix();

                                renderer.setSize( windowWidth, windowHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				var timer = Date.now() * 0.0005;

				camera.position.x = Math.sin( timer ) * 3;
				camera.position.z = Math.cos( timer ) * 3;

				camera.lookAt( cameraTarget );

				renderer.render( scene, camera );

			}

  $('#testtest').on('click', function(){
    scene.remove( mesh );
    scene.remove( geometry );
    geometry.dispose();
    material.dispose();
    init();
  });
});
