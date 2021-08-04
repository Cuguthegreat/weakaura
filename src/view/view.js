export const showSkill = (skillId, skillText) => {
    const element = document.getElementById(skillId);

    if (element) {
        element.innerText = skillText;
    }
};

export const hideSkills = skillIds => {
    for (let skillId in skillIds) {
        const element = document.getElementById(skillId);

        if (element) {
            element.innerText = null;
        }
    }
};

export const renderSkill = (skillId, css, text, isSmall) => {
    const node = document.createElement('div');
    const cssId = css;
    node.id = skillId;
    node.className = isSmall
        ? `skill skill--${cssId} skill--small`
        : `skill skill--${cssId}`;
    node.innerText = text;
    getContainer().appendChild(node);
};

const clearScreen = ctx => {
    clearInterval(interval);
    ctx.clearRect(0, 0, 300, 300);
};

let interval;
const RADIUS = 75;

export const renderProgressCircle = (duration, castTime) => {
    const start = performance.now();
    let oldElapsedTime = 0;
    let elapsedTime = 0;

    const ctx = document.getElementById('canvas').getContext('2d');

    setTimeout(() => {
        clearScreen(ctx);

        ctx.beginPath();
        ctx.strokeStyle = 'darkgreen';
        ctx.lineWidth = 6;
        ctx.arc(150, 150, RADIUS, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'lawngreen';
        ctx.lineWidth = 3;
        ctx.arc(150, 150, RADIUS, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'darkgreen';
        ctx.lineCap = 'butt';
        ctx.lineWidth = 3;

        interval = setInterval(() => {
            elapsedTime = performance.now() - start;
            ctx.arc(
                150,
                150,
                RADIUS,
                -Math.PI / 2 + (2 * Math.PI * oldElapsedTime) / duration,
                -Math.PI / 2 + (2 * Math.PI * elapsedTime) / duration
            );
            ctx.stroke();
            if (elapsedTime >= duration) {
                clearScreen(ctx);
            }
            oldElapsedTime = elapsedTime;
        }, 10);
    }, Math.max(castTime -  500, 0));
};

export const getContainer = () => document.getElementById('container');
