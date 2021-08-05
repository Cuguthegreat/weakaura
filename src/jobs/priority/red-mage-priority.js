import * as selectors from '../../state/selectors';
import {BASE_GCD} from '../../weakaura';

export const getRedMagePriority = () => ({
    getGCD,
    getNextSkills,
});

const getGCD = () => BASE_GCD;

const getNextSkills = () => {
    const blackMana = getBlackMana();
    const whiteMana = getWhiteMane();
    const needsBlack = blackMana <= whiteMana && blackMana < 80;
    const needsWhite = whiteMana <= blackMana && whiteMana < 80;
    const needsMana = needsBlack || needsWhite;
    const dualcast = canDualcast();
    const aoe = includeMultiTarget();

    const singleTarget = !aoe ? [
        ...pushIf(!isBuffed() && needsMana, '1D4F'),
        ...pushIf(dualcast && needsBlack, '1D51'),
        ...pushIf(dualcast && needsWhite, '1D53'),
        ...pushIf(!dualcast && needsMana && isVerfireReady(), '1D56'),
        ...pushIf(!dualcast && needsMana && isVerstoneReady(), '1D57'),
        ...pushIf(!needsMana, '1D67'),
    ] : [];

    const multiTarget = aoe ? [
        ...pushIf(dualcast, '1D5B'),
        ...pushIf(!dualcast && needsMana, '408C'),
        ...pushIf(!dualcast && needsMana, '408D'),
        ...pushIf(!needsMana, '1D6A'),
    ] : [];

    const cooldowns = [
        ...pushIf(
            !selectors.isCasting() && !selectors.isOnCooldown('1D5F'),
            '1D5F'
        ),
        ...pushIf(
            !selectors.isCasting() && !selectors.isOnCooldown('1D5D'),
            '1D5D'
        ),
    ];

    return [...singleTarget, ...multiTarget, ...cooldowns];
};

const pushIf = (condition, skillId) => (condition ? [skillId] : []);

const includeMultiTarget = () => {
    const enemies = selectors.getEnemies();
    const target = enemies[selectors.getTargetId()];

    if (!target) {
        return false;
    }

    let enemyCount = 0;
    for (let enemyId in enemies) {
        if (getDist(enemies[enemyId], target) < 25) {
            enemyCount++;
        }
    }

    return enemyCount >= 3;
};

const getDist = (P, Q) =>
    Math.pow(P.x - Q.x, 2) + Math.pow(P.y - Q.y, 2) + Math.pow(P.z - Q.z, 2);

const canDualcast = () =>
    selectors.isBuffActive('4e1') || selectors.isCasting();
const isVerfireReady = () => selectors.isBuffActive('4d2');
const isVerstoneReady = () => selectors.isBuffActive('4d3');
const isBuffed = () => canDualcast() || isVerfireReady() || isVerstoneReady();
const getBlackMana = () =>
    selectors.getJobDetail().blackMana +
    getManaBySpell(selectors.getCastingId()).blackMana;
const getWhiteMane = () =>
    selectors.getJobDetail().whiteMana +
    getManaBySpell(selectors.getCastingId()).whiteMana;
const getManaBySpell = spellId =>
    MANA_BY_SPELL[spellId] || {blackMana: 0, whiteMana: 0};
const MANA_BY_SPELL = {
    '1D4F': {blackMana: 3, whiteMana: 3},
    '1D51': {blackMana: 11, whiteMana: 0},
    '1D56': {blackMana: 9, whiteMana: 0},
    '1D53': {blackMana: 0, whiteMana: 11},
    '1D5B': {blackMana: 3, whiteMana: 3},
    '408C': {blackMana: 7, whiteMana: 0},
    '408D': {blackMana: 0, whiteMana: 7},
};