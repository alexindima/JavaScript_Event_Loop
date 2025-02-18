const codeLines = [
    { id: 1, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { id: 2, text: `<span class='keyword'>setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Timeout'</span>);
        <br>}, <span class='number'>0</span>);` },
    { id: 3, text: `<span class='keyword'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Microtask'</span>);
        <br>});` },
    { id: 4, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

const steps = [
    { id: 1, codeRef: 1, from: 'code', to: 'stack', pause: 1 },
    { id: 1, from: 'stack', to: 'webapi', pause: 1 },
    { id: 1, from: 'webapi', to: 'macroqueue', pause: 1 },
    { id: 1, from: 'macroqueue', to: 'stack', pause: 1 },
    { id: 1, from: 'stack', to: 'executed', remove: true, pause: 1 },
    { id: "custom", from: "macroqueue", to: "stack", code: "Custom Task", pause: 2 }
];

const codeBlocks = {};
let currentStep = 0;

function renderCode() {
    const codeContainer = document.querySelector("#code > .box-content");
    codeContainer.innerHTML = "";
    codeLines.forEach(line => {
        const codeElement = document.createElement("div");
        codeElement.className = "code-line";
        codeElement.dataset.id = line.id;
        codeElement.innerHTML = line.text;
        codeContainer.appendChild(codeElement);
    });
}

function highlightCodeLine(id) {
    document.querySelectorAll(".code-line").forEach(el => {
        el.classList.remove("active-code");
    });
    const activeLine = document.querySelector(`.code-line[data-id='${id}']`);
    if (activeLine) {
        activeLine.classList.add("active-code");
    }
}

function getCodeText(step) {
    if (step.codeRef) {
        const found = codeLines.find(line => line.id === step.codeRef);
        return found ? found.text : "Unknown Code";
    }
    return step.code || "Unknown Code";
}

function createCodeBlock(id, text, from) {
    if (!codeBlocks[id]) {
        const block = document.createElement('div');
        block.className = 'code-block';
        block.innerHTML = text;
        block.dataset.id = id;
        document.body.appendChild(block);
        codeBlocks[id] = block;
    }
    const block = codeBlocks[id];
    const fromEl = document.getElementById(from);
    const rect = fromEl.getBoundingClientRect();
    block.style.left = `${rect.left + window.scrollX + 10}px`;
    block.style.top = `${rect.top + window.scrollY + 10}px`;
}

function moveBlock(id, to, remove = false) {
    const block = codeBlocks[id];
    if (!block) return;

    const toEl = document.getElementById(to);
    const rect = toEl.getBoundingClientRect();
    gsap.to(block, { x: rect.left - block.offsetLeft + 10, y: rect.top - block.offsetTop + 10, duration: 1, onComplete: () => {
            if (remove) {
                gsap.to(block, { y: -100, opacity: 0, duration: 1, onComplete: () => block.remove() });
                delete codeBlocks[id];
            }
        }});
}

async function startAnimation() {
    for (currentStep = 0; currentStep < steps.length; currentStep++) {
        await nextStep();
    }
}

async function nextStep() {
    if (currentStep < steps.length) {
        const step = steps[currentStep];

        const codeText = getCodeText(step);
        if (step.codeRef) {
            highlightCodeLine(step.codeRef);
        }

        createCodeBlock(step.id, codeText, step.from);
        await new Promise(resolve => setTimeout(resolve, step.pause * 1000));
        moveBlock(step.id, step.to, step.remove);
        currentStep++;
    }
}

document.addEventListener("DOMContentLoaded", renderCode);
