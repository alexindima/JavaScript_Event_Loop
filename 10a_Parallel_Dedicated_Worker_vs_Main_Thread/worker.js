onmessage = (event) => {
    console.log("Worker received message:", event.data);

    let start = performance.now();
    while (performance.now() - start < 5000) {}

    postMessage("Heavy task done in Worker!");
};
