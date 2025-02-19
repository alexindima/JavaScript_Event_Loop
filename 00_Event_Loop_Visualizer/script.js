import { codeLines, steps } from './code.js';

function renderCode() {
    const codeContainer = document.querySelector("#code > .box-content");
    codeContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    codeLines.forEach(line => {
        const codeElement = document.createElement("div");
        codeElement.className = "code-line";
        codeElement.dataset.codeId = line.codeId;
        codeElement.innerHTML = line.text;
        fragment.appendChild(codeElement);
    });

    codeContainer.appendChild(fragment);
}

async function moveCodeTo(step) {
    const toEl = document.getElementById(step.to).querySelector(".box-content");
    if (!toEl) {
        console.error('Target block not found!');
        return;
    }
    const existedCodeBlock = document.querySelector(`[data-element-id='${step.elementId}']`);
    const code = existedCodeBlock
        ? createCodeBlockForMove(existedCodeBlock)
        : createCodeBlockForCopy(step);


    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.style.width = `${code.offsetWidth}px`;
    placeholder.style.height = `${code.offsetHeight}px`;
    placeholder.style.opacity = "0";

    if (step.insertPosition === "bottom") {
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
            y: -code.offsetHeight - 8,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                existingElements.forEach(el => el.style.visibility = "visible");
                wrapper.remove();
            }
        });
    } else {
        toEl.prepend(placeholder);
    }

    const rect = placeholder.getBoundingClientRect();

    return new Promise(resolve => {
        gsap.to(code, {
            x: rect.left - code.offsetLeft,
            y: rect.top - code.offsetTop,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                placeholder.replaceWith(code);
                code.style.transform = "initial";
                code.style.position = "relative";
                code.style.left = "initial";
                code.style.top = "initial";
                resolve();
            }
        });
    });
}

function createCodeBlockForMove(block) {
    const rect = block.getBoundingClientRect();

    const siblings = Array.from(block.parentElement.children);
    const aboveSiblings = siblings.filter(el => el !== block && el.getBoundingClientRect().top < rect.top);

    if (aboveSiblings.length > 0) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "absolute";
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.top = `${rect.top - rect.height - 8}px`;
        wrapper.style.width = `${block.parentElement.offsetWidth}px`;
        wrapper.style.height = `${rect.height}px`;
        wrapper.style.overflow = "hidden";
        document.body.appendChild(wrapper);

        aboveSiblings.forEach(el => {
            const clone = el.cloneNode(true);
            wrapper.appendChild(clone);
            el.style.visibility = "hidden";
        });

        gsap.to(wrapper, {
            y: rect.height + 8,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                aboveSiblings.forEach((el, index) => {
                    el.style.visibility = "visible";
                    wrapper.children[index]?.remove();
                });
                wrapper.remove();
            }
        });
    }

    const copy = block.cloneNode(true);
    copy.style.position = "absolute";
    copy.style.left = `${rect.left}px`;
    copy.style.top = `${rect.top}px`;
    copy.className = 'code-block';
    document.body.appendChild(copy);

    block.remove();

    return copy;
}

function createCodeBlockForCopy(step) {
    const block = document.querySelector(`[data-code-id='${step.codeId}']`);
    if (!block) {
        console.error(`Block with codeId ${step.codeId} not found!`);
        return null;
    }

    const rect = block.getBoundingClientRect();

    const copy = block.cloneNode(true);
    copy.style.position = "absolute";
    copy.style.left = `${rect.left}px`;
    copy.style.top = `${rect.top}px`;
    copy.className = 'code-block';
    copy.dataset.elementId = step.elementId;
    document.body.appendChild(copy);

    return copy;
}

let currentStep = 0;
let isAnimationRunning = false;
let animationInProgress = false;

async function startAnimation() {
    isAnimationRunning = true;
    for (; currentStep < steps.length;) {
        if (!isAnimationRunning) {
            break;
        }

        await nextStep();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

function stopAnimation() {
    isAnimationRunning = false;
}

async function resetAnimation() {
    while (animationInProgress) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    stopAnimation();
    currentStep = 0;

    document.querySelectorAll(".box-content:not(#buttons .box-content)").forEach(box => {
        box.innerHTML = "";
    });

    renderCode();
}

async function nextStep() {
    if (currentStep < steps.length) {
        const step = steps[currentStep];

        animationInProgress = true;

        highlightCodeLine(step.codeId);
        await moveCodeTo(step);

        animationInProgress = false;

        currentStep++;
    }
}

function highlightCodeLine(codeId) {
    document.querySelectorAll(".code-line").forEach(el => {
        el.classList.remove("active-code");
    });

    const activeLine = document.querySelector(`.code-line[data-code-id='${codeId}']`);
    activeLine?.classList.add("active-code");
}

document.addEventListener("DOMContentLoaded", () => {
    renderCode();

    document.getElementById("startBtn").addEventListener("click", startAnimation);
    document.getElementById("nextBtn").addEventListener("click", nextStep);
    document.getElementById("stopBtn").addEventListener("click", stopAnimation);
    document.getElementById("resetBtn").addEventListener("click", resetAnimation);
});