export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;' },
    { codeId: 3, text: `<span class="function">setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 1"</span>);
        <br>
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise 1"</span>);
        <br>&nbsp;&nbsp;&nbsp;&nbsp;});
        <br>}, <span class="number">0</span>);`
    },
    { codeId: 4, text: '&nbsp;' },
    { codeId: 5, text: `<span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise 2"</span>);
        <br>
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="function">setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 2"</span>);
        <br>&nbsp;&nbsp;&nbsp;&nbsp;}, <span class="number">0</span>);
        <br>});`
    },
    { codeId: 6, text: '&nbsp;' },
    { codeId: 7, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'macroqueue', highlight: { codeId: 3 },
        newCode: `
            <span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 1"</span>);
            <br><span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise 1"</span>);
            <br>});`
    },

    { elementId: 3, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 3, codeId: 5, to: 'microqueue', highlight: { codeId: 5 },
        newCode: `
        <span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise 2"</span>);
        <br><span class="function">setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 2"</span>);
        <br>}, <span class="number">0</span>);`
    },

    { elementId: 4, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 4, codeId: 7, to: 'console', insertPosition: "bottom", highlight: { codeId: 7 }, subHighlight: [{ codeId: 7, line: 2 }], newCode: "<span class='console'>End</span>" },

    { elementId: 5, from: "microqueue", to: 'stack', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Promise 2\"</span>);" },
    { elementId: 5, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Promise 2</span>" },

    { elementId: 3, to: 'stack',
        newCode: `
        <br><span class="function">setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 2"</span>);
        <br>}, <span class="number">0</span>);`
    },

    { elementId: 3, to: 'webapi' },
    { elementId: 3, to: "macroqueue", insertPosition: "bottom", newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout 2\"</span>);" },

    { elementId: 6, from: "macroqueue", to: 'stack', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout 1\"</span>);" },
    { elementId: 6, to: "console", insertPosition: "bottom", newCode: "<span class='console'>Timeout 1</span>"},

    { elementId: 2, to: "stack",
        newCode: `
        <span class='object'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise 1"</span>);
        <br>});`
    },
    { elementId: 2, to: "microqueue", newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Promise 1\"</span>);" },
    { elementId: 2, to: 'stack' },
    { elementId: 2, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Promise 1</span>" },

    { elementId: 3, to: 'stack' },
    { elementId: 3, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout 2</span>" },
];
