$(function() {

    var matchingModel;
    var container;

    var camera, scene, renderer;

    var mouseX = 0, mouseY = 0;

    var matchingContainer = $("#matching-container");
    // var windowWidth = window.innerWidth;
    // var windowHeight = window.innerHeight;
    var windowWidth = matchingContainer.width();
    var windowHeight = matchingContainer.height();
    var windowHalfX = windowWidth / 2;
    var windowHalfY = windowHeight / 2;


    init();
    animate();


    function init() {

        container = document.createElement( 'div' );
        matchingContainer.append( container );

        camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 1, 2000 );
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
                $("#matching-progress").css("width", Math.round(percentComplete, 2) + "%");
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
        loader.load( '/assets/obj/tops.obj', function ( object ) {

            matchingModel = object;
            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = texture;

                }

            } );

            object.position.y = -800;
            object.position.z = - 1000;
            // object.rotation.z = 1000;
            scene.add( object );

        }, onProgress, onError );

        // 背景を透過にする場合は下記
        // THREE.WebGLRenderer({ alpha: true });
        renderer = new THREE.WebGLRenderer();
        // 色調整
        renderer.setClearColor( 0xffffff, 1);
        renderer.setSize( windowWidth, windowHeight );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = windowWidth / 2;
        windowHalfY = windowHeight / 2;

        camera.aspect = windowWidth / windowHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( windowWidth, windowHeight );

    }

    function onDocumentMouseMove( event ) {

        mouseX = ( event.clientX - windowHalfX ) / 2;
        // mouseY = ( event.clientY - windowHalfY ) / 2;
        var cp = matchingContainer[0].getBoundingClientRect();
        matchingModel.rotation.y = (event.clientX-cp.left-160) / 72;
        // matchingModel.rotation.x = (event.clientY-cp.top-210) / 54;

    }

    //

    function animate() {

        requestAnimationFrame( animate );
        render();

    }

    function render() {

        // camera.position.x += ( mouseX - camera.position.x ) * .05;
        // camera.position.y += ( - mouseY - camera.position.y ) * .05;

        // camera.lookAt( scene.position );

        renderer.render( scene, camera );

    }

});
