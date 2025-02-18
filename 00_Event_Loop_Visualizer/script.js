const codeBlocks = {};
const steps = [
    { id: 1, code: 'setTimeout(() => { console.log(1) }, 0)', from: 'code', to: 'stack', pause: 1 },
    { id: 1, from: 'stack', to: 'webapi', pause: 1 },
    { id: 1, from: 'webapi', to: 'macroqueue', pause: 1 },
    { id: 1, from: 'macroqueue', to: 'stack', pause: 1 },
    { id: 1, from: 'stack', to: 'executed', remove: true, pause: 1 }
];

function createCodeBlock(id, text, from) {
    if (!codeBlocks[id]) {
        const block = document.createElement('div');
        block.className = 'code-block';
        block.textContent = text;
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
    for (const step of steps) {
        if (step.code) {
            createCodeBlock(step.id, step.code, step.from);
        }
        await new Promise(resolve => setTimeout(resolve, step.pause * 1000));
        moveBlock(step.id, step.to, step.remove);
    }
}
