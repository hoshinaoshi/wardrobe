$(function() {

    var container;

    var camera, scene, renderer;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;


    init();
    animate();


    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 100;

        // scene

        scene = new THREE.Scene();

        var ambient = new THREE.AmbientLight( 0x101030 );
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 0, 0, 1 );
        scene.add( directionalLight );

        // texture

        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

        };

        var texture = new THREE.Texture();

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
        };


        var loader = new THREE.ImageLoader( manager );
        loader.load( '/assets/IMG_0119.JPG', function ( image ) {

            texture.image = image;
            texture.needsUpdate = true;

        } );

        // model

        var loader = new THREE.OBJLoader( manager );
        loader.load( '/assets/obj/Sense.obj', function ( object ) {

            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = texture;

                }

            } );

            object.position.y = - 500;
            scene.add( object );

        }, onProgress, onError );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX ) / 2;
        mouseY = ( event.clientY - windowHalfY ) / 2;

    }

    //

    function animate() {

        requestAnimationFrame( animate );
        render();

    }

    function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );

        renderer.render( scene, camera );

    }

    /*
       var scene = new THREE.Scene();
       var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

       var renderer = new THREE.WebGLRenderer();
       renderer.setSize( window.innerWidth, window.innerHeight );
       document.body.appendChild( renderer.domElement );

       var geometry = new THREE.BoxGeometry( 1, 1, 1 );
       var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

       camera.position.z = 5;

       var manager = new THREE.LoadingManager();
       manager.onProgress = function ( item, loaded, total ) {

       console.log( item, loaded, total );

       };

       var texture = new THREE.Texture();

       var loader = new THREE.ImageLoader( manager );
    //loader.load( "/assets/UV_Grid_Sm.jpg", function ( image ) {
    loader.load( "/assets/IMG_0119.JPG", function ( image ) {

    texture.image = image;
    texture.needsUpdate = true;

    } );


    var loader = new THREE.OBJLoader( manager );
    loader.load( '/assets/obj/Sense.obj', function ( object ) {

    object.traverse( function ( child ) {

    if ( child instanceof THREE.Mesh ) {

    child.material.map = texture;

    }

    } );

    object.position.y = - 80;
    scene.add( object );

    } );

    var render = function () {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );
    renderer.render(scene, camera);
    };

    render();
    */
});
