export const codeLines = [
    { codeId: 1, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { codeId: 2, text: '&nbsp;'},
    { codeId: 3, text: `
        <span class='function'>setInterval</span>(() => {
            <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>"Timeout"</span>);
        <br>}, <span class="number">1000</span>);`
    },
    { codeId: 4, text: '&nbsp;'},
    { codeId: 5, text: "<span class='keyword'>let</span> start = <span class='object'>performance</span>.<span class='function'>now</span>();" },
    { codeId: 6, text: "<span class='keyword'>while</span> (<span class='object'>performance</span>.<span class='function'>now</span>() - start < <span class='number'>3000</span>) {}" },
    { codeId: 7, text: '&nbsp;'},
    { codeId: 8, text: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" },
];

export const steps = [
    { elementId: 1, codeId: 1, to: 'stack', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'webapi', highlight: { codeId: 1 } },
    { elementId: 1, codeId: 1, to: 'console', highlight: { codeId: 1 }, insertPosition: "bottom", newCode: "<span class='console'>Start</span>" },

    { elementId: 2, codeId: 3, to: 'stack', highlight: { codeId: 3 } },
    { elementId: 2, codeId: 3, to: 'webapi', highlight: { codeId: 3 } },

    { elementId: 3, codeId: 5, to: 'stack', highlight: { codeId: 5 } },
    { elementId: 3, highlight: { codeId: 5 }, destroy: true },

    { elementId: 4, codeId: 6, to: 'stack', highlight: { codeId: 6 } },
    { elementId: 5, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration 1</span>" },
    { elementId: 5, destroy: true, highlight: { codeId: 6 } },
    { elementId: 6, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration 2</span>" },
    { elementId: 6, destroy: true, highlight: { codeId: 6 } },
    { elementId: 7, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>...</span>" },
    { elementId: 7, destroy: true, highlight: { codeId: 6 } },
    { elementId: 8, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration N (after 1 second)</span>" },
    { elementId: 8, destroy: true, highlight: { codeId: 6 } },

    { elementId: 9, from: 'webapi', to: 'macroqueue', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout\"</span>);" },

    { elementId: 10, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration N+1</span>" },
    { elementId: 10, destroy: true, highlight: { codeId: 6 } },
    { elementId: 11, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration N+2</span>" },
    { elementId: 11, destroy: true, highlight: { codeId: 6 } },
    { elementId: 12, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>...</span>" },
    { elementId: 12, destroy: true, highlight: { codeId: 6 } },
    { elementId: 13, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration M (after 1 second)</span>" },
    { elementId: 13, destroy: true, highlight: { codeId: 6 } },

    { elementId: 14, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration M+1</span>" },
    { elementId: 14, destroy: true, highlight: { codeId: 6 } },
    { elementId: 15, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration M+2</span>" },
    { elementId: 15, destroy: true, highlight: { codeId: 6 } },
    { elementId: 16, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>...</span>" },
    { elementId: 16, destroy: true, highlight: { codeId: 6 } },
    { elementId: 17, codeId: 6, to: 'stack', highlight: { codeId: 6 }, newCode: "<span class='console'>Iteration O (last)</span>" },
    { elementId: 17, destroy: true, highlight: { codeId: 6 } },

    { elementId: 4, highlight: { codeId: 6 }, destroy: true },

    { elementId: 18, codeId: 8, to: 'stack', highlight: { codeId: 8 } },
    { elementId: 18, codeId: 8, to: 'webapi', highlight: { codeId: 8 } },
    { elementId: 18, codeId: 8, to: 'console', insertPosition: "bottom", highlight: { codeId: 8 }, newCode: "<span class='console'>End</span>" },

    { elementId: 9 ,to: 'stack' },
    { elementId: 9 ,to: 'webapi' },
    { elementId: 9, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout</span>" },

    { elementId: 19, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop</span>" },
    { elementId: 19, destroy: true },
    { elementId: 20, from: 'code', to: 'stack', newCode: "<span class='console'>...</span>" },
    { elementId: 20, destroy: true },
    { elementId: 21, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop (after 1 second)</span>" },
    { elementId: 21, destroy: true },

    { elementId: 22, from: 'webapi', to: 'macroqueue', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout\"</span>);" },
    { elementId: 22 ,to: 'stack' },
    { elementId: 22 ,to: 'webapi' },
    { elementId: 22, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout</span>" },

    { elementId: 23, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop</span>" },
    { elementId: 23, destroy: true },
    { elementId: 24, from: 'code', to: 'stack', newCode: "<span class='console'>...</span>" },
    { elementId: 24, destroy: true },
    { elementId: 25, from: 'code', to: 'stack', newCode: "<span class='console'>Empty loop (after 1 second)</span>" },
    { elementId: 25, destroy: true },

    { elementId: 26, from: 'webapi', to: 'macroqueue', newCode: "<span class='object'>console</span>.<span class='function'>log</span>(<span class='string'>\"Timeout\"</span>);" },
    { elementId: 26 ,to: 'stack' },
    { elementId: 26 ,to: 'webapi' },
    { elementId: 26, to: 'console', insertPosition: "bottom", newCode: "<span class='console'>Timeout</span>" },
];
