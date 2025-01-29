async function loadWasm() {
    const response = await fetch('build/optimized.wasm');
    const buffer = await response.arrayBuffer();
    const imports = {
        env: {
          // You can define any required functions here
          // For example, if you need to allocate memory, you might need to define a memory object
          memory: new WebAssembly.Memory({ initial: 1 }),
          // If you have any other functions that need to be defined, add them here
          abort: () => {
            console.error("Abort called!");
            throw new Error("Abort called!");
          },
        },
      };
    const { instance } = await WebAssembly.instantiate(buffer, imports);
    return instance.exports;
}

loadWasm().then(wasm => {
    window.addNumbers = () => {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);

        const result = wasm.add(num1, num2);
        document.getElementById('result').innerText = `Result: ${result}`;
    }

    window.subtractNumbers = () => {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);

        const result = wasm.subtract(num1, num2);
        document.getElementById('result').innerText = `Result: ${result}`;
    }

    window.multiplyNumbers = () => {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);

        const result = wasm.multiply(num1, num2);
        document.getElementById('result').innerText = `Result: ${result}`;
    }

    window.divideNumbers = () => {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);

        try {
            const result = wasm.divide(num1, num2);
            document.getElementById('result').innerText = `Result: ${result}`;
        } catch (error) {
            document.getElementById('result').innerText = `Error: ${error.message}`;
        }
    }
})
