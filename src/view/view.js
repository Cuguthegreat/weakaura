import {setTargetHp} from '../state/store';
import * as store from '../state/store';

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

export const removeSkill = skillId => {
    const node = document.getElementById(skillId);

    node != null && node.remove();
}

export const clearScreen = () => {
    clearTimeout(timeout);
    clearInterval(interval);
    getCtx().clearRect(0, 0, 300, 300);
};

const getCtx = () => document.getElementById('canvas').getContext('2d');

let interval;
let timeout;

const RADIUS = 75;

const drawCircle = (color, lineWidth) => {
    const ctx = getCtx();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.arc(150, 150, RADIUS, 0, 2 * Math.PI);
    ctx.stroke();
};

export const renderProgressCircle = (duration, castTime) => {
    const start = performance.now();
    let oldElapsedTime = 0;
    let elapsedTime = 0;

    const ctx = getCtx();

    timeout = setTimeout(() => {
        clearScreen();
        drawCircle('darkgreen', 6);
        drawCircle('lawngreen', 3);

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
                clearScreen();
            }
            oldElapsedTime = elapsedTime;
        }, 10);
    }, Math.max(castTime - 500, 0));
};

const buttons = [];

export const renderButton = ({id, text, onclick, oncontextmenu}) => {
    const button = document.createElement('button');
    buttons.push(button);
    button.id = id;
    button.className = 'button';
    button.innerText = text;
    button.onclick = () => {
        onclick();
        buttons.forEach(button => (button.className = 'button'));
        button.className = 'button button--active';
    };
    button.oncontextmenu = () => {
        oncontextmenu();
        button.className = 'button';
    };
    getContainer().appendChild(button);
};

export const showButtons = () => {
    buttons.forEach(button => button.className = 'button');
}

export const hideButtons = () => {
    buttons.forEach(button => button.className = 'button button--hidden');
}

export const getContainer = () => document.getElementById('container');
