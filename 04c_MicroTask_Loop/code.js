export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;' },
    { codeId: 3, text: `<span class="function">setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Macrotask"</span>);
        <br>}, <span class="number">0</span>);`
    },
    { codeId: 4, text: '&nbsp;' },
    { codeId: 5, text: `<span class='keyword'>function</span> <span class='function'>addMicrotask</span>() {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Microtask"</span>);
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>queueMicrotask</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>addMicrotask</span>();
        <br>&nbsp;&nbsp;&nbsp;&nbsp;});
        <br>}`
    },
    { codeId: 6, text: '&nbsp;' },
    { codeId: 7, text: "<span class='function'>addMicrotask</span>();" },
    { codeId: 8, text: '&nbsp;' },
    { codeId: 9, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'webapi', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'macroqueue', highlight: { codeId: 3 }, newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Macrotask\"</span>);" },

    { elementId: 3, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 4, from: 'code', to: 'stack', highlight: { codeId: 7 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 4, to: 'webapi', highlight: { codeId: 7 }, subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 4, to: 'console', highlight: { codeId: 7 }, subHighlight: [{ codeId: 5, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Microtask</span>" },
    { elementId: 5, from: 'code', to: 'stack', highlight: { codeId: 7 }, subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }],
        newCode:
            `<span class='function'>queueMicrotask</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>addMicrotask</span>();
            <br>});`
    },
    { elementId: 5, to: 'microqueue', highlight: { codeId: 7 }, subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }], newCode: "<span class='function'>addMicrotask</span>();" },
    { elementId: 3, destroy: true, highlight: { codeId: 7 } },

    { elementId: 6, codeId: 9, to: 'stack', highlight: { codeId: 9 } },
    { elementId: 6, codeId: 9, to: 'webapi', highlight: { codeId: 9 } },
    { elementId: 6, codeId: 9, to: 'console', highlight: { codeId: 9 }, insertPosition: "bottom", newCode: "<span class='console'>End</span>" },

    { elementId: 5, to: 'stack' },
    { elementId: 7, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 7, to: 'webapi', subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 7, to: 'console', subHighlight: [{ codeId: 5, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Microtask</span>" },
    { elementId: 8, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }],
        newCode:
            `<span class='function'>queueMicrotask</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>addMicrotask</span>();
            <br>});`
    },
    { elementId: 8, to: 'microqueue', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }], newCode: "<span class='function'>addMicrotask</span>();" },
    { elementId: 5, destroy: true },

    { elementId: 8, to: 'stack' },
    { elementId: 9, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 9, to: 'webapi', subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 9, to: 'console', subHighlight: [{ codeId: 5, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Microtask</span>" },
    { elementId: 10, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }],
        newCode:
            `<span class='function'>queueMicrotask</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>addMicrotask</span>();
            <br>});`
    },
    { elementId: 10, to: 'microqueue', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }], newCode: "<span class='function'>addMicrotask</span>();" },
    { elementId: 8, destroy: true },

    { elementId: 10, to: 'stack' },
    { elementId: 11, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Microtask\"</span>);" },
    { elementId: 11, to: 'webapi', subHighlight: [{ codeId: 5, line: 2 }] },
    { elementId: 11, to: 'console', subHighlight: [{ codeId: 5, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Microtask</span>" },
    { elementId: 12, from: 'code', to: 'stack', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }],
        newCode:
            `<span class='function'>queueMicrotask</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>addMicrotask</span>();
            <br>});`
    },
    { elementId: 12, to: 'microqueue', subHighlight: [{ codeId: 5, line: 3 }, { codeId: 5, line: 4 }, { codeId: 5, line: 5 }], newCode: "<span class='function'>addMicrotask</span>();" },
    { elementId: 10, destroy: true },
];
