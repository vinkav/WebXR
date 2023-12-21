import * as THREE from '../js/three/three.module.js';
import {ARButton} from '../js/three/ARButton.js';


document.addEventListener("DOMContentLoaded", () => {
	//основна функція
	const initialize = async() => {
		// створення сцени з червоним кубом розміром 5 см

	        let scene = new THREE.Scene();
	        let camera = new THREE.PerspectiveCamera();

		let renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	        renderer.setSize(window.innerWidth, window.innerHeight);
	        renderer.setPixelRatio(window.devicePixelRatio);

	        document.body.appendChild(renderer.domElement);

		// Додаємо до вашого коду три ханойські вежі

		// Створюємо масив для зберігання веж
		var hanoiTowers = [];
		// Створюємо масив для зберігання основ
		var bases = [];
		// Створюємо масив для зберігання кілець
		var rings = [];

		// Створюємо функцію для створення вежі
		function createTower (x, y, z, radius, height, color) {
		  // Створюємо геометрію і матеріал для вежі
		  var towerGeometry = new THREE.CylinderBufferGeometry (radius, radius, height, 32);
		  var towerMaterial = new THREE.MeshStandardMaterial ({color: color});
		  // Створюємо меш для вежі
		  var tower = new THREE.Mesh (towerGeometry, towerMaterial);
		  // Встановлюємо позицію вежі
		  tower.position.set (x, y, z);
		  // Додаємо вежу до сцени
		  scene.add (tower);
		  // Додаємо вежу до масиву
		  towers.push (tower);
		}
	
		// Створюємо функцію для створення основи
		function createBase (x, y, z, width, height, depth, color) {
		  // Створюємо геометрію і матеріал для основи
		  var baseGeometry = new THREE.BoxBufferGeometry (width, height, depth);
		  var baseMaterial = new THREE.MeshStandardMaterial ({color: color});
		  // Створюємо меш для основи
		  var base = new THREE.Mesh (baseGeometry, baseMaterial);
		  // Встановлюємо позицію основи
		  base.position.set (x, y, z);
		  // Додаємо основу до сцени
		  scene.add (base);
		  // Додаємо основу до масиву
		  bases.push (base);
		}

		// Створюємо функцію для створення кільця
		function createRing (x, y, z, innerRadius, outerRadius, color) {
		  // Створюємо геометрію і матеріал для кільця
		  var ringGeometry = new THREE.TorusBufferGeometry (outerRadius, (outerRadius - innerRadius) / 2, 16, 100);
		  var ringMaterial = new THREE.MeshStandardMaterial ({color: color});
		  // Створюємо меш для кільця
		  var ring = new THREE.Mesh (ringGeometry, ringMaterial);
		  // Встановлюємо позицію і поворот кільця
		  ring.position.set (x, y, z);
		  ring.rotation.x = Math.PI / 2;
		  // Додаємо кільце до сцени
		  scene.add (ring);
		  // Додаємо кільце до масиву
		  rings.push (ring);
		}

		// Створюємо три вежі з різними кольорами і позиціями
		createTower (-0.5, 0.5, -0.5, 0.025, 0.25, 0xff0000); // Червона вежа
		createTower (0, 0.5, -0.7, 0.025, 0.25, 0x00ff00); // Зелена вежа
		createTower (0.5, 0.5, -0.9, 0.025, 0.25, 0x0000ff); // Синя вежа
		
		// Створюємо три основи з тими самими кольорами і позиціями, що і вежі
		for (var i = 0; i < towers.length; i++) {
		  var tower = towers [i];
		  var towerPos = tower.position;
		  var towerColor = tower.material.color;
		  createBase (towerPos.x, towerPos.y - 0.55, towerPos.z, 0.125, 0.025, 0.125, towerColor);
		}
		
		// Створюємо 5 кілець з різними розмірами і кольорами, які розташовані на першій вежі
		createRing (-0.5, 0.55, -0.5, 0.025, 0.075, 0xffff00); // Жовте кільце
		createRing (-0.5, 0.6, -0.5, 0.05, 0.1, 0xff00ff); // Рожеве кільце
		createRing (-0.5, 0.65, -0.5, 0.075, 0.125, 0x00ffff); // Блакитне кільце
		createRing (-0.5, 0.7, -0.5, 0.1, 0.15, 0xff0000); // Червоне кільце
		createRing (-0.5, 0.75, -0.5, 0.125, 0.175, 0x00ff00); // Зелене кільце

       
        	var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        	scene.add(light);

		// повідомлення рушія Three.js про параметри використання WebXR
		renderer.xr.enabled = true;

		// перевірка запуску та завершення сесії WebXR
		renderer.xr.addEventListener("sessionstart", (evt) => {
			renderer.setAnimationLoop(() => {
			    renderer.render(scene, camera);
			}); 
		});


		const arButton = ARButton.createButton(renderer, {
				optionalFeatures: ["dom-overlay"],
				domOverlay: {root: document.body},
			}
		);
		arButton.textContent = "Увійти до WebXR";
		document.body.appendChild(arButton);
	}

	initialize(); // розпочати роботу
});