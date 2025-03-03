export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>first</span>() {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"First"</span>);
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='keyword'>function </span><span class='function'>second</span>() {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Second"</span>);
        <br>}`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='function'>first</span>();" },
    { codeId: 6, text: "<span class='function'>second</span>();" },
    { codeId: 7, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 2, codeId: 1, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"First\"</span>);" },
    { elementId: 2, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }] },
    { elementId: 2, to: 'console', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>First</span>" },
    { elementId: 1, destroy: true, highlight: { codeId: 5 } },
    { elementId: 3, codeId: 6, to: 'stack', highlight: { codeId: 6 } },
    { elementId: 4, codeId: 3, to: 'stack', highlight: { codeId: 6 }, subHighlight: [{ codeId: 3, line: 2 }], newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Second\"</span>);" },
    { elementId: 4, to: 'webapi', highlight: { codeId: 6 }, subHighlight: [{ codeId: 3, line: 2 }] },
    { elementId: 4, to: 'console', highlight: { codeId: 6 }, subHighlight: [{ codeId: 3, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Second</span>" },
    { elementId: 3, destroy: true, highlight: { codeId: 6 } },
    { elementId: 5, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 5, to: 'webapi', highlight: { codeId: 7 } },
    { elementId: 5, to: 'console', highlight: { codeId: 7 }, insertPosition: "bottom", newCode: "<span class='console'>End</span>" },
];
