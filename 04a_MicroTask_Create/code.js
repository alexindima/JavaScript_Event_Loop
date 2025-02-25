export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;' },
    { codeId: 3, text: `<span class='keyword'>const</span> promise = <span class='keyword'>new</span> <span class='function'>Promise</span>((resolve) => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise executor"</span>);
        <br>&nbsp;&nbsp;&nbsp;&nbsp;resolve();
        <br>});`
    },
    { codeId: 4, text: '&nbsp;' },
    { codeId: 5, text: `promise.<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Promise"</span>);
        <br>});`
    },
    { codeId: 6, text: '&nbsp;' },
    { codeId: 7, text: `<span class='function'>queueMicrotask</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"QueueMicrotask"</span>);
        <br>});`
    },
    { codeId: 8, text: '&nbsp;' },
    { codeId: 9, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'webapi', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 3, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>Promise executor</span>);" },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 }, subHighlight: [{ codeId: 3, line: 2 }] },
    { elementId: 2, codeId: 3, to: 'console', highlight: { codeId: 3 }, subHighlight: [{ codeId: 3, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Promise executor</span>" },

    { elementId: 3, codeId: 3, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 3, line: 3 }], newCode: "resolve();" },
    { elementId: 3, highlight: { codeId: 3 }, subHighlight: [{ codeId: 3, line: 3 }], destroy: true },

    { elementId: 4, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 4, codeId: 5, to: 'microqueue', highlight: { codeId: 5 }, subHighlight: [{ codeId: 5, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Promise\"</span>);" },

    { elementId: 5, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 5, codeId: 7, to: 'microqueue', insertPosition: "bottom", highlight: { codeId: 7 }, subHighlight: [{ codeId: 7, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"QueueMicrotask\"</span>);" },

    { elementId: 6, codeId: 9, to: 'stack', highlight: { codeId: 9 } },
    { elementId: 6, codeId: 9, to: 'webapi', highlight: { codeId: 9 } },
    { elementId: 6, codeId: 9, to: 'console', highlight: { codeId: 9 }, insertPosition: "bottom", newCode: "<span class='console'>End</span>" },

    { elementId: 4, codeId: 5, to: 'stack' },
    { elementId: 4, codeId: 5, to: 'webapi' },
    { elementId: 4, codeId: 5, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Promise</span>" },

    { elementId: 5, codeId: 7, to: 'stack' },
    { elementId: 5, codeId: 7, to: 'webapi' },
    { elementId: 5, codeId: 7, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>QueueMicrotask</span>" },
];
