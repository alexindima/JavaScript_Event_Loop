export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;' },
    { codeId: 3, text: `<span class='function'>setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout"</span>);
        <br>}, <span class="number">0</span>);`
    },
    { codeId: 4, text: '&nbsp;' },
    { codeId: 5, text: `<span class="keyword">function</span> <span class='function'>recursiveMicrotask</span>() {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Microtask"</span>);
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(<span class='function'>recursiveMicrotask</span>);
    <br>}` },
    { codeId: 6, text: '&nbsp;' },
    { codeId: 7, text: "<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(<span class='function'>recursiveMicrotask</span>);" },
    { codeId: 8, text: '&nbsp;' },
    { codeId: 9, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'webapi', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'macroqueue', highlight: { codeId: 3 },
        newCode: `<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout"</span>);`
    },

    { elementId: 3, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 3, codeId: 7, to: 'microqueue', highlight: { codeId: 7 }, newCode: "<span class='function'>recursiveMicrotask</span>();" },

    { elementId: 4, codeId: 9, to: 'stack', highlight: { codeId: 9 } },
    { elementId: 4, codeId: 9, to: 'webapi', highlight: { codeId: 9 } },
    { elementId: 4, codeId: 9, to: 'console', insertPosition: "bottom", highlight: { codeId: 9 }, subHighlight: [{ codeId: 7, line: 2 }], newCode: "<span class='console'>End</span>" },

    { elementId: 3, codeId: 7, to: 'stack' },
    { elementId: 5, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 5, codeId: 5, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 5, codeId: 5, to: 'console', insertPosition: "bottom", highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='console'>Microtask</span>" },
    { elementId: 6, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(<span class='function'>recursiveMicrotask</span>);" },
    { elementId: 6, codeId: 5, to: 'microqueue', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='function'>recursiveMicrotask</span>();" },
    { elementId: 3, codeId: 7, destroy: true },

    { elementId: 6, codeId: 7, to: 'stack' },
    { elementId: 7, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 7, codeId: 5, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 7, codeId: 5, to: 'console', insertPosition: "bottom", highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='console'>Microtask</span>" },
    { elementId: 8, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(<span class='function'>recursiveMicrotask</span>);" },
    { elementId: 8, codeId: 5, to: 'microqueue', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='function'>recursiveMicrotask</span>();" },
    { elementId: 6, codeId: 7, destroy: true },

    { elementId: 8, codeId: 7, to: 'stack' },
    { elementId: 9, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 9, codeId: 5, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 9, codeId: 5, to: 'console', insertPosition: "bottom", highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='console'>Microtask</span>" },
    { elementId: 10, codeId: 5, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(<span class='function'>recursiveMicrotask</span>);" },
    { elementId: 10, codeId: 5, to: 'microqueue', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 3 }], newCode: "<span class='function'>recursiveMicrotask</span>();" },
    { elementId: 8, codeId: 7, destroy: true },
];

for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
        let start = performance.now();
        while (performance.now() - start < 1000) {}
        console.log(`Timeout ${i * 1000}`);
    }, 0);
}

requestIdleCallback(() => {
    console.log("Idle Task (с таймаутом 2000 мс)");
}, { timeout: 2000 });

requestIdleCallback(() => {
    console.log("Idle Task (без таймаута)");
});