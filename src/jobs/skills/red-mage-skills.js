const RED_MAGE_SKILLS = {
    '1D4F': {
        name: 'Jolt',
        level: '2',
        text: '1',
        gcd: true,
        castTime: 2000,
    },
    '1D51': {
        name: 'Verthunder',
        level: '4',
        text: '2',
        gcd: true,
    },
    '1D56': {
        name: 'Verfire',
        level: '26',
        text: '3',
        gcd: true,
        castTime: 2000,
    },
    '1D53': {
        name: 'Veraero',
        level: '10',
        text: '4',
        gcd: true,
    },
    '1D57': {
        name: 'Verstone',
        level: '30',
        text: '5',
        gcd: true,
        castTime: 2000,
    },
    '1D5F': {
        name: 'Contre Sixte',
        level: '56',
        text: '6',
        cooldown: 45,
    },
    '1D5D': {
        name: 'Fleche',
        level: '45',
        text: '7',
        cooldown: 25,
    },
    '1D5B': {
        name: 'Scatter',
        level: '15',
        text: 'a1',
        css: '1',
        gcd: true,
    },
    '408C': {
        name: 'Verthunder II',
        level: '18',
        text: 'a2',
        css: '2',
        gcd: true,
        castTime: 2000,
        isSmall: true,
    },
    '408D': {
        name: 'Veraero II',
        level: '22',
        text: 'a4',
        css: '4',
        gcd: true,
        castTime: 2000,
        isSmall: true,
    },
    '1D67': {
        name: 'Enchanted Riposte',
        level: '1',
        text: 's1',
        combos: ['1D68'],
        isSmall: true,
        css: '1',
    },
    '1D68': {
        name: 'Enchanted Zwerchhau',
        level: '35',
        text: 's2',
        combos: ['1D69'],
        isSmall: true,
        css: '2',
    },
    '1D69': {
        name: 'Enchanted Redoublement',
        level: '50',
        text: 's3',
        isSmall: true,
        css: '3',
    },
    '1D6A': {
        name: 'Enchanted Moulinet',
        level: '52',
        text: 's5',
        isSmall: true,
    },
    '1D5E': {
        name: 'Acceleration',
        level: '50',
        text: 's6',
        buff: ['4d6'],
        isSmall: true,
    },
    '1D50': {
        name: 'Riposte',
    },
    '1D58': {
        name: 'Zwerchhau',
    },
    '1D5C': {
        name: 'Redoublement',
    },
    '1D59': {
        name: 'Moulinet',
    },
    '1D52 ': {
        name: 'Corps-A-Corps',
        level: '6',
        text: 'Q',
    },
    '1D5B ': {
        name: 'Displacement ',
        level: '40',
        text: 'Z',
    },
};

const RED_MAGE_COMBO = {
    comboBreaker: [
        '1D4F',
        '1D51',
        '1D56',
        '1D53',
        '1D57',
        '1D5B',
        '408C',
        '408D',
        '1D67',
        '1D68',
        '1D69',
        '1D6A',
        '1D50',
        '1D58',
        '1D5C',
    ],
    comboStarter: ['1D67'],
};

const RED_MAGE_STACKS = {};

export const getRedMageSkills = () => ({
    skills: RED_MAGE_SKILLS,
    combo: RED_MAGE_COMBO,
    stacks: RED_MAGE_STACKS,
});
