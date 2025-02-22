export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>outer</span>() {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Outer start"</span>);
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>inner</span>();
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Outer end"</span>);
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='keyword'>function </span><span class='function'>inner</span>() {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Inner"</span>);
        <br>}`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='function'>outer</span>();" },
    { codeId: 6, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 2, codeId: 1, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Outer start\"</span>);" },
    { elementId: 2, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }] },
    { elementId: 2, to: 'console', insertPosition: "bottom", highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='console'>Outer start</span>" },
    { elementId: 3, codeId: 1, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 3 }], newCode: "<span class='function'>inner</span>();" },
    { elementId: 4, codeId: 3, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 3 }, { codeId: 3, line: 2 }], newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Inner\"</span>);" },
    { elementId: 4, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 3 }, { codeId: 3, line: 2 }] },
    { elementId: 4, to: 'console', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 3 }, { codeId: 3, line: 2 }], insertPosition: "bottom", newCode: "<span class='console'>Inner</span>" },
    { elementId: 3, destroy: true, highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 3 }] },
    { elementId: 5, codeId: 1, to: 'stack', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 4 }], newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Outer end\"</span>);" },
    { elementId: 5, to: 'webapi', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 4 }] },
    { elementId: 5, to: 'console', highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 4 }], insertPosition: "bottom", newCode: "<span class='console'>Outer end</span>" },
    { elementId: 1, destroy: true, highlight: { codeId: 5 }, subHighlight: [{ codeId: 1, line: 4 }] },
    { elementId: 6, codeId: 6, to: 'stack', highlight: { codeId: 6 } },
    { elementId: 6, to: 'webapi', highlight: { codeId: 6 } },
    { elementId: 6, to: 'console', highlight: { codeId: 6 }, insertPosition: "bottom", newCode: "<span class='console'>End</span>" },
];