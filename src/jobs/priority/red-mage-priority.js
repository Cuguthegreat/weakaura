import * as selectors from '../../state/selectors';
import {contains, pushAllIf, pushIf} from '../../service/functional-helper';

export const getRedMagePriority = () => ({
    getGCDModifier,
    getNextSkills,
});

const getGCDModifier = skillId =>
    contains(skillId, ['1D67', '1D68', '1D69', '1D6A']) ? 1 : 0.96;

const getNextSkills = () => {
    const blackMana = getBlackMana();
    const whiteMana = getWhiteMane();
    const needsBlack = blackMana <= whiteMana && blackMana < 80;
    const needsWhite = whiteMana <= blackMana && whiteMana < 80;
    const needsMana = needsBlack || needsWhite;
    const dualcast = canDualcast();
    const isAoE =
        (affectsMultiTarget() && !selectors.isSingleTargetMode()) ||
        selectors.isMultiTargetMode();
    const availableCombos = getAvailableCombos() || [];
    const isCombo = availableCombos.length > 0;
    const level = selectors.getLevel();

    const combos = [
        ...pushIf(contains('1D68', availableCombos), '1D68'),
        ...pushIf(contains('1D69', availableCombos), '1D69'),
    ];

    const singleTarget = [
        ...pushIf(!isBuffed() && needsMana, '1D4F'),
        ...pushIf(dualcast && needsBlack, '1D51'),
        ...pushIf(dualcast && needsWhite, '1D53'),
        ...pushIf(!dualcast && needsMana && isVerfireReady(), '1D56'),
        ...pushIf(!dualcast && needsMana && isVerstoneReady(), '1D57'),
        ...pushIf(!needsMana, '1D67'),
    ];

    const multiTarget = [
        ...pushIf(dualcast, '1D55'),
        ...pushIf(!dualcast && needsBlack, '408C'),
        ...pushIf(!dualcast && needsWhite, '408D'),
        ...pushIf(!needsMana, '1D6A'),
    ];

    const globalCooldown = [
        ...pushAllIf(isCombo, combos),
        ...pushAllIf(!isCombo && !isAoE, singleTarget),
        ...pushAllIf(!isCombo && isAoE, multiTarget),
    ];

    const simpleCooldowns = [
        '1D5F',
        '1D5D',
        '1D60',
        '1D52',
        '1D5B',
        '1D8A',
        '1D89',
    ].filter(cd => !selectors.isOnCooldown(cd));

    const cooldowns = [
        ...simpleCooldowns,
        ...pushIf(!isAoE && !selectors.isOnCooldown('1D5E'), '1D5E'),
    ];

    const priority = [
        ...globalCooldown,
        ...pushAllIf(!selectors.isCasting(), cooldowns),
    ].filter(skillId => selectors.getSkill(skillId).level <= level);

    return priority.length > 0 ? priority : selectors.getComboStarter();
};

const getAvailableCombos = () =>
    selectors.getPreviousSkill() && selectors.getPreviousSkill().combos;

const affectsMultiTarget = () => {
    const enemies = selectors.getEnemies();
    const target = selectors.getTarget();

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
    '1D55': {blackMana: 3, whiteMana: 3},
    '408C': {blackMana: 7, whiteMana: 0},
    '408D': {blackMana: 0, whiteMana: 7},
};