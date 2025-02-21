export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>outer()</span> {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Outer start"</span>);
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>inner()</span>;
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Outer end"</span>);
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='keyword'>function </span><span class='function'>inner()</span> {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Inner"</span>);
        <br>}`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='function'>outer</span>();" },
    { codeId: 6, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 5, to: 'stack' },
    { elementId: 2, codeId: 1, to: 'stack', newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Outer start\"</span>);" },
    { elementId: 2, to: 'webapi' },
    { elementId: 2, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Outer start</span>" },
    { elementId: 3, codeId: 1, to: 'stack', newCode: "<span class='function'>inner()</span>;" },
    { elementId: 4, codeId: 3, to: 'stack', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Inner\"</span>);" },
    { elementId: 4, to: 'webapi' },
    { elementId: 4, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Inner</span>" },
    { elementId: 3, destroy: true },
    { elementId: 5, codeId: 1, to: 'stack', newCode: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>\"Outer end\"</span>);" },
    { elementId: 5, to: 'webapi' },
    { elementId: 5, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Outer end</span>" },
    { elementId: 1, destroy: true },
    { elementId: 6, codeId: 6, to: 'stack' },
    { elementId: 6, to: 'webapi' },
    { elementId: 6, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>End</span>" },
];