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

export const clearScreen = () => {
    clearTimeout(timeout);
    clearInterval(interval);
    getCtx().clearRect(0, 0, 300, 300);
};

const getCtx = () => document.getElementById('canvas').getContext('2d');

let interval;
let timeout;

const RADIUS = 75;

export const renderProgressCircle = (duration, castTime) => {
    const start = performance.now();
    let oldElapsedTime = 0;
    let elapsedTime = 0;

    const ctx = getCtx();

    timeout = setTimeout(() => {
        clearScreen();

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
                -Math.PI / 2 + (2 * Math.PI * elapsedTime) / duration,
            );
            ctx.stroke();
            if (elapsedTime >= duration) {
                clearScreen(ctx);
            }
            oldElapsedTime = elapsedTime;
        }, 10);
    }, Math.max(castTime - 500, 0));
};

const onAoEButtonClick = () => {
    store.setTargetMode('AoE');
};

const onSTButtonClick = () => {
    store.setTargetMode('ST')
};

const onContextmenu = () => {
    store.setTargetMode(null);
};

export const renderButtons = () => {
    const aoeButton = document.createElement('button');
    aoeButton.id = 'aoe-button';
    aoeButton.className = 'button';
    aoeButton.innerText = 'AoE';
    aoeButton.onclick = () => {
        onAoEButtonClick();
        stButton.className = 'button'
        aoeButton.className = 'button button--active'
    };
    aoeButton.oncontextmenu = () => {
        onContextmenu();
        aoeButton.className = 'button'
    };
    getContainer().appendChild(aoeButton);

    const stButton = document.createElement('button');
    stButton.id = 'st-button';
    stButton.className = 'button';
    stButton.innerText = 'ST';
    stButton.onclick = () => {
        onSTButtonClick();
        aoeButton.className = 'button'
        stButton.className = 'button button--active'
    };
    stButton.oncontextmenu = () => {
        onContextmenu();
        stButton.className = 'button'
    };
    getContainer().appendChild(stButton);
};

export const getContainer = () => document.getElementById('container');
