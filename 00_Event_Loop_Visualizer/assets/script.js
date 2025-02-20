import { codeLines, steps } from '../code.js';

let currentStep = 0;
let isAnimationRunning = false;
let animationInProgress = false;

async function startAnimation() {
    setActiveButton("startBtn");
    isAnimationRunning = true;
    for (; currentStep < steps.length;) {
        if (!isAnimationRunning) {
            break;
        }
        await nextStep();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setActiveButton("stopBtn");
}

function stopAnimation() {
    isAnimationRunning = false;
    setActiveButton("stopBtn");
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
    setActiveButton("resetBtn");
    updateButtonState();
}

async function nextStep() {
    if (animationInProgress) {
        return;
    }

    if (currentStep < steps.length) {
        if (!isAnimationRunning) {
            setActiveButton("nextBtn");
        }
        const step = steps[currentStep];
        animationInProgress = true;

        if (step.destroy) {
            await destroyElement(step);
        } else {
            highlightCodeLine(step.codeId);
            await moveCodeTo(step);
        }

        animationInProgress = false;
        if (!isAnimationRunning) {
            setActiveButton("stopBtn");
        }
        currentStep++;
        updateButtonState();
    }
}

function setActiveButton(activeButtonId) {
    const activeButton = document.getElementById(activeButtonId)
    document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

function updateButtonState() {
    const isDisabled = currentStep >= steps.length;
    document.getElementById("startBtn").disabled = isDisabled;
    document.getElementById("nextBtn").disabled = isDisabled;
    document.getElementById("stopBtn").disabled = isDisabled;
}

function highlightCodeLine(codeId) {
    document.querySelectorAll(".code-line").forEach(el => {
        el.classList.remove("active-code");
    });

    const activeLine = document.querySelector(`.code-line[data-code-id='${codeId}']`);
    activeLine?.classList.add("active-code");
}

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
        ? createCodeBlockForMove(step)
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

function createCodeBlockForMove(step) {
    const block = document.querySelector(`[data-element-id='${step.elementId}']`);
    if (!block) {
        console.error(`Block with data-element-idId ${step.elementId} not found!`);
        return null;
    }

    const rect = block.getBoundingClientRect();

    moveAboveSiblingsDown(block, rect);

    const copy = block.cloneNode(true);
    copy.style.position = "absolute";
    copy.style.left = `${rect.left}px`;
    copy.style.top = `${rect.top}px`;
    copy.className = 'code-block';
    if (step.newCode) {
        copy.innerHTML = `<div class="code-line">${step.newCode}</div>`;
    }

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
    if (step.newCode) {
        copy.innerHTML = `<div class="code-line">${step.newCode}</div>`;
    }

    document.body.appendChild(copy);

    return copy;
}

async function destroyElement(step) {
    const element = document.querySelector(`[data-element-id='${step.elementId}']`);
    if (!element) {
        console.warn(`Element with ID ${step.elementId} not found for destruction.`);
        return;
    }

    const rect = element.getBoundingClientRect();

    const ghost = element.cloneNode(true);
    ghost.style.position = "absolute";
    ghost.style.left = `${rect.left + window.scrollX}px`;
    ghost.style.top = `${rect.top + window.scrollY}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.opacity = "1";

    document.body.appendChild(ghost);
    element.style.visibility = "hidden";

    moveAboveSiblingsDown(element, rect, () => element.remove());

    return new Promise(resolve => {
        gsap.to(ghost, {
            y: -150,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                ghost.remove();
                resolve();
            }
        });
    });
}

function moveAboveSiblingsDown(element, rect, onCompleteCallback) {
    const parent = element.parentElement;
    const aboveSiblings = Array.from(parent.children).filter(el => el !== element && el.getBoundingClientRect().top < rect.top);

    if (aboveSiblings.length === 0) {
        return;
    }

    const topSibling = aboveSiblings.reduce((max, el) => {
        const elRect = el.getBoundingClientRect();
        return elRect.top > max.top ? elRect : max;
    }, { top: 0 });

    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = `${rect.left}px`;
    wrapper.style.top = `${topSibling.top - rect.height - 8}px`;
    wrapper.style.width = `${parent.offsetWidth}px`;
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = `8px`;
    wrapper.style.overflow = "hidden";

    aboveSiblings.forEach(el => {
        const clone = el.cloneNode(true);
        wrapper.appendChild(clone);
        el.style.visibility = "hidden";
    });

    document.body.appendChild(wrapper);

    gsap.to(wrapper, {
        y: rect.height + 8,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            aboveSiblings.forEach(el => el.style.visibility = "visible");
            wrapper.remove();
            onCompleteCallback?.();
        }
    });

    return wrapper;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCode();

    document.getElementById("startBtn").addEventListener("click", startAnimation);
    document.getElementById("nextBtn").addEventListener("click", nextStep);
    document.getElementById("stopBtn").addEventListener("click", stopAnimation);
    document.getElementById("resetBtn").addEventListener("click", resetAnimation);
});