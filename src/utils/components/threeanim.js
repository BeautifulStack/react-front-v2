import React, {Component, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import * as dat from 'dat.gui'
import gsap from 'gsap'
import {GLOBAL} from "../functions/GLOBAL";
import {request} from "../functions/request";

export class ThreeJS extends Component {

    componentDidMount() {



        // === THREE.JS CODE START ===
        const textureLoader = new THREE.TextureLoader()


        // Debug



        // Canvas
        const canvas = document.querySelector('canvas.webgl')

        // Scene
        const scene = new THREE.Scene()

        const geometry = new THREE.PlaneBufferGeometry(1, 1.3)

        for (let i = 0; i < 4; i++) {
            const material = new THREE.MeshBasicMaterial({
                map: textureLoader.load(`/image/${i}.jpg`)
            })

            const img = new THREE.Mesh(geometry, material)
            img.position.set(Math.random() + .3, i * -1.8)

            scene.add(img)
        }

        let objs = []

        scene.traverse((object) => {
            if (object.isMesh)
                objs.push((object))
        })



        // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        scene.add(pointLight)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 2
        scene.add(camera)


        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })

        // document.body.appendChild(renderer.domElement);
        // renderer.domElement.classList.add("threejs")
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        //Mouse

        window.addEventListener("wheel", onMouseWheel)

        let y = 0
        let position = 0

        function onMouseWheel(event) {
            y = event.deltaY * 0.0007
        }

        const mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX / sizes.width * 2 - 1
            mouse.y = - (event.clientY / sizes.height) * 2 + 1
        })

        /**
         * Animate
         */

        const raycaster = new THREE.Raycaster()

        const clock = new THREE.Clock()

        const tick = () => {

            const elapsedTime = clock.getElapsedTime()

            // Update objects

            position += y
            y *= .9

            //Raycaster

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(objs)
            for (const intersect of intersects) {
                gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 })
                gsap.to(intersect.object.rotation, { y: -.5 })
                gsap.to(intersect.object.position, { z: -0.9 })
            }

            for (const object of objs) {
                if (!intersects.find(intersect => intersect.object === object)) {
                    gsap.to(object.scale, { x: 1, y: 1 })
                    gsap.to(object.rotation, { y: 0 })
                    gsap.to(object.position, { z: 0 })
                }
            }



            camera.position.y = position

            // Update Orbital Controls
            // controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
        // === THREE.JS EXAMPLE CODE END ===
    }
    render() {

        return (
            <div>
                <About />
                <canvas class="webgl">

                </canvas>
            </div>
        )
    }
}

export const About = () => {
    const [money, setMoney] = useState(0)

    const getMoney = () => {
        request("https://blockchain.octobyte.cloud/balance/WITHDRAW", 'GET').then(res => setMoney(res.balance))
    }

    useEffect(() => {
        getMoney()
    }, [])

    return (
        <div className="webgl-div-title">
            <h3 style={{ fontSize: '34px', marginTop: '250px' }}>FairRepack - Smart Shop</h3>
            <br/>
            <div style={{ fontSize: '24px', textAlign: 'left' }}>
                FairRepack is about <b>Community and Tegridy</b> !<br/>
                <br/>
                Sell us your products you don't use anymore or are broken.<br/>
                Buy us our reconditioned products and give them a second life.<br/>
                <br/>
                By shopping on our site, and link your address from the<br/>
                mobile application, you can earn some Green Coins that<br/>
                you can redistribute to the association's project of your<br/>
                choice !<br/>
                <br/>
                For now, we gathered <b>{money} EUR</b> that been reversed to<br/>
                different associations of yours.<br/>
            </div>
        </div>
    )
}