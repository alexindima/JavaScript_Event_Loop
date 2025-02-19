const codeLines = [
    { id: 1, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start'</span>);" },
    { id: 2, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start2'</span>);" },
    { id: 3, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Start3'</span>);" },
    { id: 20, text: `<span class='keyword'>setTimeout</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Timeout'</span>);
        <br>}, <span class='number'>0</span>);` },
    { id: 30, text: `<span class='keyword'>Promise</span>.<span class='function'>resolve</span>().<span class='function'>then</span>(() => {
        <br>&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'Microtask'</span>);
        <br>});` },
    { id: 40, text: "<span class='keyword'>console</span>.<span class='function'>log</span>(<span class='string'>'End'</span>);" }
];

const steps = [
    { id: 1, codeRef: 1, from: 'code', to: 'stack', insertPosition: 'bottom', pause: 1 },
    // { id: 2, codeRef: 2, from: 'code', to: 'stack', insertPosition: 'top', pause: 1 },
    // { id: 4, codeRef: 3, from: 'code', to: 'stack', insertPosition: 'bottom', pause: 1 },
    { id: 1, from: 'stack', to: 'webapi', insertPosition: 'bottom', pause: 1 },

    /*{ id: 1, from: 'stack', to: 'webapi', pause: 1 },
    { id: 1, from: 'webapi', to: 'macroqueue', pause: 1 },
    { id: 1, from: 'macroqueue', to: 'stack', pause: 1 },
    { id: 1, from: 'stack', to: 'executed', remove: true, pause: 1 },
    { id: "custom", from: "macroqueue", to: "stack", code: "Custom Task", pause: 2 }*/
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

function createCodeBlock(id, text, from, insertPosition = 'bottom') {
    const fromEl = document.getElementById(from);
    if (!fromEl) return;

    const block = document.createElement('div');
    block.className = 'code-block';
    block.innerHTML = text;
    document.body.appendChild(block);

    const rect = fromEl.getBoundingClientRect();
    block.style.left = `${rect.left + window.scrollX}px`;
    block.style.top = `${rect.top + window.scrollY}px`;

    codeBlocks[id] = block;
}

function moveBlock(id, to, insertPosition = 'bottom', remove = false) {
    const block = codeBlocks[id];
    if (!block) return;

    const toEl = document.getElementById(to).querySelector(".box-content");
    if (!toEl) return;

    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.style.width = `${block.offsetWidth}px`;
    placeholder.style.height = `${block.offsetHeight}px`;
    placeholder.style.opacity = "0.2";

    if (insertPosition === "top") {
        toEl.prepend(placeholder);
    } else {
        const wrapper = document.createElement("div");
        wrapper.classList.add("box-content");
        wrapper.style.position = "absolute";
        wrapper.style.left = `${toEl.getBoundingClientRect().left + window.scrollX}px`;
        wrapper.style.top = `${toEl.getBoundingClientRect().top + window.scrollY}px`;
        wrapper.style.width = `${toEl.offsetWidth}px`;
        wrapper.style.height = `${toEl.offsetHeight}px`;

        const existingElements = Array.from(toEl.children);
        existingElements.forEach(el => {
            const clone = el.cloneNode(true);
            wrapper.appendChild(clone);
            el.style.visibility = "hidden";
        });

        document.body.appendChild(wrapper);

        toEl.appendChild(placeholder);

        gsap.to(wrapper, {
            y: -block.offsetHeight - 8,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                existingElements.forEach(el => el.style.visibility = "visible");
                wrapper.remove();
            }
        });
    }

    const rect = placeholder.getBoundingClientRect();

    gsap.to(block, {
        x: rect.left - block.offsetLeft,
        y: rect.top - block.offsetTop,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            placeholder.replaceWith(block);
            block.style.transform = "initial";
            block.style.position = "relative";
            block.style.left = "initial";
            block.style.top = "initial";
            wrapper.remove();
        }
    });
}



async function startAnimation() {
    for (currentStep = 0; currentStep < steps.length; currentStep++) {
        await nextStep();
        await new Promise(resolve => setTimeout(resolve, step.pause * 1000));
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
        moveBlock(step.id, step.to, step.insertPosition, step.remove);
        currentStep++;
    }
}

document.addEventListener("DOMContentLoaded", renderCode);
