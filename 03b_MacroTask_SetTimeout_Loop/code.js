export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='function'>setTimeout</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 0"</span>);
        <br>}, <span class="number">0</span>);`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: `
        <span class='function'>setTimeout</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 2000 "</span>);
        <br>}, <span class="number">2000</span>);`
    },
    { codeId: 6, text: '&nbsp;'},
    { codeId: 7, text: `
        <span class='function'>setTimeout</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout 4000"</span>);
        <br>}, <span class="number">4000</span>);`
    },
    { codeId: 8, text: '&nbsp;'},
    { codeId: 9, text: "<span class='keyword'>let</span> start = <span class='object'>performance</span>.<span class='function'>now</span>();" },
    { codeId: 10, text: "<span class='keyword'>while</span> (<span class='object'>performance</span>.<span class='function'>now</span>() - start < <span class='number'>3000</span>) {}" },
    { codeId: 11, text: '&nbsp;'},
    { codeId: 12, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" },
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'webapi', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'macroqueue', highlight: { codeId: 3 }, newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout 0\"</span>);" },

    { elementId: 3, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 3, codeId: 5, to: 'webapi', highlight: { codeId: 5 } },

    { elementId: 4, codeId: 7, to: 'stack', highlight: { codeId: 7 } },
    { elementId: 4, codeId: 7, to: 'webapi', highlight: { codeId: 7 } },

    { elementId: 5, codeId: 9, to: 'stack', highlight: { codeId: 9 } },
    { elementId: 5, highlight: { codeId: 9 }, destroy: true },

    { elementId: 6, codeId: 10, to: 'stack', highlight: { codeId: 10 } },
    { elementId: 7, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>Iteration 1</span>" },
    { elementId: 7, destroy: true, highlight: { codeId: 10 } },
    { elementId: 8, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>Iteration 2</span>" },
    { elementId: 8, destroy: true, highlight: { codeId: 10 } },
    { elementId: 9, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>...</span>" },
    { elementId: 9, destroy: true, highlight: { codeId: 10 } },
    { elementId: 10, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>Iteration N (after 2 seconds)</span>" },
    { elementId: 10, destroy: true, highlight: { codeId: 10 } },

    { elementId: 3, to: 'macroqueue', insertPosition: "bottom", newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout 2000\"</span>);" },

    { elementId: 11, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>Iteration N+1</span>" },
    { elementId: 11, destroy: true, highlight: { codeId: 10 } },
    { elementId: 12, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>...</span>" },
    { elementId: 12, destroy: true, highlight: { codeId: 10 } },
    { elementId: 13, codeId: 10, to: 'stack', highlight: { codeId: 10 }, newCode: "<span class='console'>Iteration M (last)</span>" },
    { elementId: 13, destroy: true, highlight: { codeId: 10 } },

    { elementId: 6, to: 'stack', highlight: { codeId: 10 }, destroy: true },

    { elementId: 14, codeId: 12, to: 'stack', highlight: { codeId: 12 } },
    { elementId: 14, codeId: 12, to: 'webapi', highlight: { codeId: 12 } },
    { elementId: 14, codeId: 12, to: 'console', insertPosition: "bottom", highlight: { codeId: 12 }, newCode: "<span class='console'>End</span>" },

    { elementId: 2, to: 'stack' },
    { elementId: 2, to: 'webapi' },
    { elementId: 2, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout 0</span>" },

    { elementId: 3, to: 'stack' },
    { elementId: 3, to: 'webapi' },
    { elementId: 3, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout 2000</span>" },

    { elementId: 15, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop</span>" },
    { elementId: 15, destroy: true },

    { elementId: 16, from: 'code', to: 'stack', newCode: "<span class='console'>...</span>" },
    { elementId: 16, destroy: true },

    { elementId: 17, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop (after 1 second)</span>" },
    { elementId: 17, destroy: true },

    { elementId: 4, to: 'macroqueue', insertPosition: "bottom", newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout 4000\"</span>);" },
    { elementId: 4, to: 'stack' },
    { elementId: 4, to: 'webapi' },
    { elementId: 4, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout 4000</span>" },
];
