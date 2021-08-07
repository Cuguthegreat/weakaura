import * as selectors from '../../state/selectors';
import {contains, containsAny} from '../../service/functional-helper';
import {KILO} from '../../config';

export const getSamuraiPriority = () => ({
    getGCDModifier,
    getNextSkills,
});

const SKILL_SPEED_MODIFIER = 0.98;
const TEN_PERCENT_MODIFIER = 0.9;
const THIRTEEN_PERCENT_MODIFIER = 0.87;

const getGCDModifier = () =>
    selectors.isBuffActive('513')
        ? SKILL_SPEED_MODIFIER * TEN_PERCENT_MODIFIER
        :  SKILL_SPEED_MODIFIER;

const getNextSkills = () => {
    let priority = [...getSamuraiSkillPriority(), ...getSamuraiUtility()];

    if (
        containsAny(['1D41', '1D40', '1D3F'], priority) &&
        selectors.getKenki() >= 20 &&
        !selectors.isBuffActive('4cd')
    ) {
        priority.push('4CD');
    }

    return priority;
};

const getSamuraiUtility = () => [
    ...(!isExecutingCombo() &&
    isFullyBuffed() &&
    !selectors.isOnCooldown('1D4B')
        ? ['1D4B']
        : []),
];

const isExecutingCombo = () =>
    selectors.getPreviousSkill() && selectors.getPreviousSkill().combos;

const isFullyBuffed = () =>
    selectors.isBuffActive('513') && selectors.isBuffActive('512');

const isSenCast = () =>
    contains(selectors.getCastingId(), ['1D41', '1D40', '1D3F']);
const isSenActive = id => (isSenCast() ? false : selectors.isSenActive(id));
const getSens = () => (isSenCast() ? 0 : selectors.getSens());

const getSamuraiSkillPriority = () => {
    const previousSkillId = selectors.getPreviousSkillId();

    if (contains(previousSkillId, ['1D3D', '1D3C']) && getSens() === 2) {
        return ['1D40'];
    }

    if (contains(previousSkillId, ['1D3D', '1D3C', '1D40'])) {
        return ['1D3B'];
    }

    // a1 -> a2, a4
    if (previousSkillId === '1D3B') {
        return ['1D3D', '1D3C'];
    }

    if (getSens() === 3) {
        return ['1D3F'];
    }

    // 1 -> 2
    if (previousSkillId === '1D35' && !selectors.isBuffActive('513')) {
        return ['1D37'];
    }

    // 1 -> 4
    if (previousSkillId === '1D35' && !selectors.isBuffActive('512')) {
        return ['1D36'];
    }

    // dot
    if (
        getSens() === 1 &&
        selectors.isBuffActive('513') &&
        selectors.isBuffActive('512') &&
        !selectors.isDotActive('1D41') &&
        !selectors.willTargetDieWithin(42)
    ) {
        return ['1D41'];
    }

    // cooldown 5, 3, 6
    if (selectors.getStacks()['4d1'].current > 0) {
        if (
            !isSenActive('1D39') &&
            (selectors.getStacks()['4d1'].current =
                3 || selectors.getBuffTimeLeft('512') > 10 * KILO)
        ) {
            return ['1D39'];
        } else if (!isSenActive('1D3A')) {
            return ['1D3A'];
        } else {
            return ['1D38'];
        }
    }

    if (
        previousSkillId === '1D35' &&
        !isSenActive('1D37') &&
        selectors.getBuffTimeLeft('513') < 10 * KILO
    ) {
        return ['1D37'];
    }

    // 1 -> 4
    if (previousSkillId === '1D35' && !isSenActive('1D36')) {
        return ['1D36'];
    }

    if (
        previousSkillId === '1D35' &&
        !isSenActive('1D38') &&
        selectors.getBuffTimeLeft('513') > 20 * KILO
    ) {
        return ['1D38'];
    }

    // 1 -> 2
    if (previousSkillId === '1D35' && !isSenActive('1D37')) {
        return ['1D37'];
    }

    // 1 -> 6
    if (previousSkillId === '1D35') {
        return ['1D38'];
    }

    // 4 -> 5
    if (previousSkillId === '1D36') {
        return ['1D39'];
    }

    // 2 -> 3
    if (previousSkillId === '1D37') {
        return ['1D3A'];
    }

    if (previousSkillId) {
        return ['1D35'];
    }

    return selectors.getComboStarter();
};
