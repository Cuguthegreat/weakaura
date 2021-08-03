const SAMURAI_SKILLS = {
    '1D35': {
        name: 'Hakaze',
        level: '1',
        text: '1',
        combos: ['1D37', '1D36', '1D38'],
    },
    '1D37': {
        name: 'Shifu',
        level: '18',
        text: '2',
        combos: ['1D3A'],
        buff: '513',
    },
    '1D3A': {
        name: 'Kasha',
        level: '40',
        text: '3',
        combos: null,
    },
    '1D36': {
        name: 'Jinpu',
        level: '4',
        text: '4',
        combos: ['1D39'],
        buff: '512',
    },
    '1D39': {
        name: 'Gekko',
        level: '1',
        text: '5',
        combos: null,
    },
    '1D38': {
        name: 'Yukikaze',
        level: '50',
        text: '6',
        combos: null,
    },
    '1D3B': {
        name: 'Fuga',
        level: '26',
        text: 'a1',
        combos: ['1D3D', '1D3C'],
        isSmall: true,
    },
    '1D3D': {
        name: 'Oka',
        level: '45',
        text: 'a2',
        combos: null,
        isSmall: true,
    },
    '1D3C': {
        name: 'Mangetsu',
        level: '35',
        text: 'a4',
        combos: null,
        isSmall: true,
    },
    '1D3E': {
        name: 'Enpi',
        level: '15',
        text: 'Q',
        combos: null,
    },
    '1D4B': {
        name: 'Meikyo Shisui',
        level: '50',
        text: 's6',
        combos: null,
        isMinuteMan: true,
        cooldown: 55,
        isSmall: true,
    },
    '1D41': {
        name: 'Higanbana',
        level: '30',
        text: '[1]',
        css: '7',
        combos: null,
        isSmall: true,
        dot: 57,
    },
    '1D40': {
        name: 'Tenka Goken',
        level: '30',
        text: '[2]',
        css: '7',
        combos: null,
        isSmall: true,
    },
    '1D3F': {
        name: 'Midare Setsugekka',
        level: '30',
        text: '7',
        combos: null,
    },
};

const SAMURAI_COMBO = {
    comboBreaker: [
        '1D35',
        '1D37',
        '1D3A',
        '1D36',
        '1D39',
        '1D38',
        '1D3B',
        '1D3D',
        '1D3C',
        '1D3E',
        '1D4B',
    ],
    comboStarter: ['1D35', '1D3B'],
};

// 1D4B
const SAMURAI_STACKS = {'4d1': {current: 0, maximum: 3}};

export const getSamuraiSkills = () => SAMURAI_SKILLS;
export const getSamuraiCombo = () => SAMURAI_COMBO;
export const getSamuraiStacks = () => SAMURAI_STACKS;
