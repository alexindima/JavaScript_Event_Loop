export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>infinite</span>() {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>infinite</span>();
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: "<span class='function'>infinite</span>();" },
];

export const steps = [
    { elementId: 1, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 3, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 4, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 5, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 6, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 7, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 8, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: '...' },
    { elementId: 9, codeId: 1, to: 'stack', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], newCode: "<span class='function'>infinite</span>();" },
    { elementId: 10, from: 'webapi', to: 'console', highlight: { codeId: 3 }, subHighlight: [{ codeId: 1, line: 2 }], insertPosition: "bottom", newCode: "<span class='error'>Uncaught RangeError: Maximum call stack size exceeded</span>" }
];