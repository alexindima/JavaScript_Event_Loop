onconnect = (event) => {
    const port = event.ports[0];

    port.onmessage = (message) => {
        console.log("Worker received message:", message.data);

        const start = performance.now();
        while (performance.now() - start < 5000) {}

        port.postMessage("Heavy task done in Shared Worker!");
    };
};
