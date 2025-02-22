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

        highlightCodeLine(step.highlight);
        subHighlightCodeLine(step.subHighlight);

        if (step.destroy) {
            await destroyElement(step);
        } else {
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

function highlightCodeLine(highlight) {
    document.querySelectorAll("#code .box-content > *").forEach(el => {
        el.classList.remove("active-code");
    });

    const activeLine = document.querySelector(`[data-code-id='${highlight?.codeId}']`);
    if (!activeLine) {
        return;
    }

    if (highlight.line) {
        const lines = activeLine.innerHTML.split("<br>");
        if (highlight.line >= 0 && highlight.line < lines.length) {
            lines[highlight.line] = `<span class='active-code new-code'>${lines[highlight.line]}</span>`;
            activeLine.innerHTML = lines.join("<br>");
        }
    } else {
        activeLine.classList.add("active-code");
    }
}

function subHighlightCodeLine(subHighlight) {
    document.querySelectorAll("#code .box-content *").forEach(el => {
        el.classList.remove("sub-active-code");
    });

    if (!subHighlight) {
        return;
    }

    subHighlight.forEach((el) => {
        const subActiveLine = document.querySelector(`[data-code-id='${el?.codeId}']`);
        if (!subActiveLine) {
            return;
        }

        if (el.line) {
            const lines = subActiveLine.innerHTML.split("<br>");
            if (el.line >= 0 && el.line < lines.length) {
                lines[el.line - 1] = `<span class='sub-active-code new-code'>${lines[el.line - 1]}</span>`;
                subActiveLine.innerHTML = lines.join("<br>");
            }
        } else {
            subActiveLine.classList.add("sub-active-code");
        }
    })
}


function renderCode() {
    const codeContainer = document.querySelector("#code > .box-content");
    codeContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    codeLines.forEach(line => {
        const codeElement = document.createElement("div");
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

    let code;
    if (step.from) {
        code = createCodeBlock(step);
    } else {
        const existedCodeBlock = document.querySelector(`[data-element-id='${step.elementId}']`);
        code = existedCodeBlock
            ? createCodeBlockForMove(step)
            : createCodeBlockForCopy(step);
    }

    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.style.width = `${code.offsetWidth}px`;
    placeholder.style.height = `${code.offsetHeight}px`;
    placeholder.style.opacity = "0";

    if (step.insertPosition === "bottom") {
        toEl.appendChild(placeholder);
    } else if (step.insertPosition === "bottom-shift") {
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
    copy.style.width = `${rect.width}px`;
    copy.className = 'code-block';
    if (step.newCode) {
        copy.innerHTML = step.newCode;
    }

    document.body.appendChild(copy);

    block.remove();

    return copy;
}

function createCodeBlock(step) {
    if (!step.newCode) {
        console.error(`For new code from block must be set newCode option!`);
    }

    const fromEl = document.getElementById(step.from)?.querySelector(".box-content");
    if (!fromEl) {
        console.error(`Source block '${step.from}' not found!`);
        return;
    }

    const rect = fromEl.getBoundingClientRect();

    const newElement = document.createElement("div");
    newElement.style.position = "absolute";
    newElement.style.left = `${rect.left}px`;
    newElement.style.top = `${rect.top}px`;
    newElement.style.width = `${rect.width - 10}px`;
    newElement.className = 'code-block';
    newElement.dataset.elementId = step.elementId;
    newElement.innerHTML = step.newCode;

    document.body.appendChild(newElement);

    return newElement;
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
    copy.style.width = `${rect.width}px`;
    copy.className = 'code-block';
    copy.dataset.elementId = step.elementId;
    if (step.newCode) {
        copy.innerHTML = step.newCode;
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
                element.remove();
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