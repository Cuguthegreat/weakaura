import * as store from '../state/store';
import * as view from '../view/view';
import * as skills from './skills';

export const renderButtons = () => {
    view.renderButton({
        id: 'aoe-button',
        text: 'AoE',
        onclick: onAoEButtonClick,
        oncontextmenu: onContextmenu,
    });

    view.renderButton({
        id: 'st-button',
        text: 'ST',
        onclick: onSTButtonClick,
        oncontextmenu: onContextmenu,
    });
};

const onAoEButtonClick = () => {
    store.setTargetMode('AoE');
    skills.showSkills();
};

const onSTButtonClick = () => {
    store.setTargetMode('ST');
    skills.showSkills();
};

const onContextmenu = () => {
    store.setTargetMode(null);
    skills.showSkills();
};