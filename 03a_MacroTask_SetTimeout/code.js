export const codeLines = [
    { codeId: 1, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='function'>setTimeout</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout"</span>);
        <br>}, <span class="number">0</span>);`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },
    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'macroqueue', highlight: { codeId: 3 }, newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout\"</span>);" },
    { elementId: 3, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 3, codeId: 5, to: 'console', highlight: { codeId: 5 }, insertPosition: "bottom", newCode: "<span class='console'>End</span>" },
    { elementId: 2, codeId: 3, to: 'stack' },
    { elementId: 2, codeId: 3, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout</span>" },
];