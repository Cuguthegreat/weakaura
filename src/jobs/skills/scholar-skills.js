const SCHOLAR_SKILLS = {
    '45CD': {
        name: 'Ruin',
        level: '1',
        text: '1',
        gcd: 2500,
        castTime: 2500,
    },
    '45C8': {
        name: 'Bio',
        dot: 'b3',
        level: '2',
        text: '2',
        gcd: 2500,
    },
    BE: {
        name: 'Physick',
        level: '4',
        text: '7',
        gcd: 2500,
        castTime: 1500,
    },
    '4340': {
        name: 'Summon Selene',
        level: '4',
        gcd: 2500,
        castTime: 2500,
    },
    '4099': {
        name: 'Whispering Dawn',
        level: '20',
        text: 'a7',
        cooldown: 60,
        isSmall: true,
    },
    '45C9': {
        name: 'Bio II',
        level: '26',
        text: '2',
        gcd: 2500,
    },
    B9: {
        name: 'Adloquium',
        level: '30',
        text: '3',
        gcd: 2500,
        castTime: 2000,
    },
    BA: {
        name: 'Succor',
        level: '35',
        text: 'a3',
        gcd: 2500,
        castTime: 2000,
        isSmall: true,
    },
    '45CE': {
        name: 'Ruin II',
        level: '38',
        text: 's1',
        gcd: 2500,
        isSmall: true,
    },
    '409A': {
        name: 'Fey Illumination',
        level: '40',
        text: 's7',
        cooldown: 120,
        isSmall: true,
    },
    A6: {
        name: 'Aetherflow',
        level: 45,
        text: 's4',
        cooldown: 60,
        isSmall: true,
    },
    A7: {
        name: 'Energy Drain',
        level: 45,
        text: '4',
        cooldown: 3,
    },
    BD: {
        name: 'Lustrate',
        level: '45',
        text: 'E'
    },
};

const SCHOLAR_COMBO = {
    comboBreaker: [],
    comboStarter: [],
};

const SCHOLAR_STACKS = {};

export const getScholarSkills = () => ({
    skills: SCHOLAR_SKILLS,
    combo: SCHOLAR_COMBO,
    stacks: SCHOLAR_STACKS,
});