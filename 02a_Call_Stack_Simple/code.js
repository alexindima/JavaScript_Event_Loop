export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>first()</span> {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"First"</span>);
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='keyword'>function </span><span class='function'>second()</span> {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Second"</span>);
        <br>}`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='function'>first</span>();" },
    { codeId: 6, text: "<span class='function'>second</span>();" },
    { codeId: 7, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 5, to: 'stack' },
    { elementId: 2, codeId: 1, to: 'stack', newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"First\"</span>);" },
    { elementId: 2, to: 'webapi' },
    { elementId: 2, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>First</span>" },
    { elementId: 1, destroy: true },
    { elementId: 3, codeId: 6, to: 'stack' },
    { elementId: 4, codeId: 3, to: 'stack', newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Second\"</span>);" },
    { elementId: 4, to: 'webapi' },
    { elementId: 4, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Second</span>" },
    { elementId: 3, destroy: true },
    { elementId: 5, codeId: 7, to: 'stack' },
    { elementId: 5, to: 'webapi' },
    { elementId: 5, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>End</span>" },
];