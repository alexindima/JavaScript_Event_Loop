export const codeLines = [
    { codeId: 1, text: `
        <span class='keyword'>function </span><span class='function'>infinite()</span> {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='function'>infinite()</span>;
        <br>}`
    },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: "<span class='function'>infinite</span>();" },
];

export const steps = [
    { elementId: 1, codeId: 3, to: 'stack' },
    { elementId: 2, codeId: 3, to: 'stack' },
    { elementId: 3, codeId: 3, to: 'stack' },
    { elementId: 4, codeId: 3, to: 'stack' },
    { elementId: 5, codeId: 3, to: 'stack', newCode: '...' },
    { elementId: 6, codeId: 3, to: 'stack' },
    { elementId: 7, codeId: 3, to: 'stack' },
    { elementId: 8, codeId: 3, to: 'stack' },
    { elementId: 9, codeId: 3, to: 'stack' },
    { elementId: 10, from: 'webapi', to: 'console', insertPosition: "bottom", newCode: "<span class='error'>Uncaught RangeError: Maximum call stack size exceeded</span>" }
];