import {getState} from './store.js';
import {contains} from '../service/functional-helper';
import {KILO} from '../config';

export const getJob = () => getState().job;

export const getSkills = () => getState().skills;

export const getSkill = skillId => getState().skills[skillId];

export const isSkill = skillId =>
    getState().skills && contains(skillId, Object.keys(getState().skills));

export const getName = () => getState().name;

export const getLevel = () => getState().level;

export const getKenki = () => (isSamurai() ? getState().jobDetail.kenki : null);

export const isPlayer = name => name && name === getState().name;

export const getJobDetail = () => getState().jobDetail;

export const getPreviousSkillId = () => getState().previousSkillId;

export const getPreviousSkillTargetId = () => getState().previousSkillTargetId;

export const getPreviousSkillTimestamp = () =>
    getState().previousSkillTimestamp;

export const getPreviousSkill = () => {
    const skillId = getPreviousSkillId();

    return skillId && getSkill(skillId);
};

export const getComboStarter = () => getState().comboStarter;

export const isComboStarter = skillId =>
    getState().comboStarter && contains(skillId, getState().comboStarter);

export const isComboBreaker = skillId =>
    getState().comboBreaker && contains(skillId, getState().comboBreaker);

export const getSkillText = skillId =>
    (getSkills()[skillId] && getSkills()[skillId].text) || null;

export const getComboTimeout = () => getState().comboTimeout;

export const getStacks = () => getState().stacks;

export const isBuffActive = buffId =>
    getState().buffs && contains(buffId, Object.keys(getState().buffs));

export const getBuffTimeLeft = buffId =>
    (getState().buffs &&
        getState().buffs[buffId] &&
        getState().buffs[buffId].duration * KILO -
            (performance.now() - getState().buffs[buffId].timestamp)) ||
    0;

export const isDotActive = dotId =>
    getState().dots && contains(dotId, Object.keys(getState().dots));

export const isSamurai = () => getState().job === 'SAM';

const getSetsu = () => (isSamurai() ? getState().jobDetail.setsu : null);

const getGetsu = () => (isSamurai() ? getState().jobDetail.getsu : null);

const getKa = () => (isSamurai() ? getState().jobDetail.ka : null);

export const getSens = () =>
    isSamurai() ? getSetsu() + getGetsu() + getKa() : null;

export const isSenActive = skillId =>
    SKILL_SEN_MAP[skillId] && SKILL_SEN_MAP[skillId]();

const SKILL_SEN_MAP = {
    '1D37': getKa,
    '1D3A': getKa,
    '1D36': getGetsu,
    '1D39': getGetsu,
    '1D38': getSetsu,
};

export const getCastingId = () => getState().castingId;

export const isCasting = () => getState().castingId !== null;

export const isOnCooldown = skillId => contains(skillId, getState().onCooldown);

export const willTargetDieWithin = seconds => {
    const target = getState().target;

    return target && getState().target.hp < seconds * getState().groupDps;
};

export const getTarget = () => getState().target;

export function hasTargetChanges(newTarget) {
    const oldTarget = getTarget().target;

    if(!newTarget || !oldTarget) {
        return true;
    }

    return (
        newTarget.id !== oldTarget.id ||
        newTarget.x !== oldTarget.x ||
        newTarget.y !== oldTarget.y ||
        newTarget.z !== oldTarget.z ||
        newTarget.hp !== oldTarget.hp
    );
}

export const triggersGCD = skillId =>
    getSkill(skillId) && getSkill(skillId).gcd;

export const getCastTime = skillId =>
    (getSkill(skillId) && getSkill(skillId).castTime) || 0;

export const isInstantCast = skillId => getCastTime(skillId) === 0;

export const isEnemy = id => contains(id, Object.keys(getState().enemies));

export const getEnemies = () => getState().enemies;

export const isMultiTargetMode = () => getState().targetMode === 'AoE';

export const isSingleTargetMode = () => getState().targetMode === 'ST';