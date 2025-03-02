console.log("Script 1 - Start");

for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
        let start = performance.now();
        while (performance.now() - start < 1000) {}
        console.log(`Script 1 - Timeout ${i * 1000}`);

        setTimeout(() => {
            console.log(`Script 1 - Inner Timeout ${i}`)
        }, 0);
    }, 0);
}

console.log("Script 1 - End");