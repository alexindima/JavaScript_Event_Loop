onconnect = (event) => {
    const port = event.ports[0];

    port.onmessage = () => {
        port.postMessage("");
    };
};
