// File API: Завантаження та читання файлу
document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("fileContent").textContent = e.target.result;
        };
        reader.readAsText(file);
    }
});

// WebRTC API: Отримання відеопотоку з камери
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById("videoElement").srcObject = stream;
    } catch (error) {
        console.error("Помилка доступу до камери:", error);
    }
}

startCamera();

// WebAssembly: Завантаження та виконання WAT файлу
async function loadWasm() {
    const response = await fetch('/hello.wat'); // Завантаження WAT файлу
    const watText = await response.text(); // Отримання текстового вмісту

    // Компіляція WAT у WebAssembly формат
    const watToWasm = `
        (module
          (func $hello (result i32)
            i32.const 42
          )
          (export "hello" (func $hello))
        )
    `;

    const encoder = new TextEncoder();
    const watBuffer = encoder.encode(watToWasm);
    const wasmModule = await WebAssembly.compile(watBuffer);
    const instance = await WebAssembly.instantiate(wasmModule);

    const result = instance.exports.hello(); // Виклик функції з WebAssembly
    console.log("Результат виконання WebAssembly:", result); // Очікуваний результат: 42
}
