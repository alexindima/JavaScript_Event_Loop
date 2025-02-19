export const codeLines = [
    { codeId: 1, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start2'</span>);" },
    { codeId: 3, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start3'</span>);" },
    { codeId: 20, text: `<span class='keyword'>setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Timeout'</span>);
        <br>}, <span class='number'>0</span>);` },
    { codeId: 30, text: `<span class='keyword'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Microtask'</span>);
        <br>});` },
    { codeId: 40, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', insertPosition: 'bottom' },
    { elementId: 6, codeId: 2, to: 'stack' },
    { elementId: 1, codeId: 1, to: 'webapi' },
    { elementId: 2, codeId: 2, to: 'stack', insertPosition: 'top' },
    { elementId: 3, codeId: 3, to: 'stack', insertPosition: 'bottom' },
    { elementId: 4, codeId: 3, to: 'stack' },
];