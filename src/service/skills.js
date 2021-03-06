import * as samuraiSkills from '../jobs/skills/samurai-skills';
import * as selectors from '../state/selectors';
import * as store from '../state/store';
import * as view from '../view/view';
import * as samuraiPriority from '../jobs/priority/samurai-priority';
import {contains} from './functional-helper';
import * as redMageSkills from '../jobs/skills/red-mage-skills';
import * as redMagePriority from '../jobs/priority/red-mage-priority';
import {KILO} from '../config';
import * as scholarSkills from '../jobs/skills/scholar-skills';
import * as scholarPriority from '../jobs/priority/scholar-priority';

const EMPTY_PRIORITY = {
    getNextSkills: () => [],
    getGCDModifier: () => 1,
};

// TODO Split into skills update and init
const JOB_SKILLS_MAP = {
    SAM: samuraiSkills.getSamuraiSkills,
    RDM: redMageSkills.getRedMageSkills,
    SCH: scholarSkills.getScholarSkills,
};

const JOB_PRIORITY_MAP = {
    SAM: samuraiPriority.getSamuraiPriority,
    RDM: redMagePriority.getRedMagePriority,
    SCH: scholarPriority.getScholarPriority,
};

export const setSkillsForJob = newJob => {
    const skills =
        JOB_SKILLS_MAP[newJob] &&
        JOB_SKILLS_MAP[newJob]() &&
        JOB_SKILLS_MAP[newJob]().skills;

    if (!skills) {
        return;
    }

    const combos = JOB_SKILLS_MAP[newJob]().combo;
    const stacks = JOB_SKILLS_MAP[newJob]().stacks;

    store.setSkills(skills);

    if (combos) {
        store.setComboBreaker(combos.comboBreaker);
        store.setComboStarter(combos.comboStarter);
    }

    if (stacks) {
        store.setStacks(stacks);
    }

    for (let skillId in skills) {
        const skill = skills[skillId];
        view.renderSkill(
            skillId,
            skill.css || skill.text,
            selectors.isComboStarter(skillId) ? skill.text : null,
            skill.isSmall
        );
    }
};

const isSuccessfulCombo = skillId => {
    if (contains(skillId, selectors.getComboStarter())) {
        return true;
    }

    const previousSkill = selectors.getPreviousSkill();

    return (
        previousSkill &&
        previousSkill.combos &&
        contains(skillId, previousSkill.combos)
    );
};

const isDuplicate = (skillId, targetId) =>
    selectors.getPreviousSkillId() === skillId &&
    selectors.getPreviousSkillTargetId() !== targetId &&
    performance.now() - selectors.getPreviousSkillTimestamp() < KILO;

const updatePreviousSkill = (skillId, targetId, flags) => {
    const isSuccess =
        (!isMiss(flags) && isSuccessfulCombo(skillId)) ||
        isDuplicate(skillId, targetId);
    store.setPreviousSkillData(
        isSuccess ? skillId : null,
        isSuccess ? skillId : null,
        isSuccess ? performance.now() : null
    );
    let timeout = setTimeout(() => {
        if (timeout === selectors.getComboTimeout()) {
            store.resetPreviousSkillData();
            showSkills();
        }
    }, 15 * KILO);
    store.setComboTimeout(timeout);
};

export const updateSkills = (skillId, targetId, flags) => {
    const skill = selectors.getSkill(skillId);
    if (skill) {
        if (selectors.isComboBreaker(skillId)) {
            updatePreviousSkill(skillId, targetId, flags);
        }
        if (skill.cooldown) {
            store.addOnCooldown(skillId);
            setTimeout(() => {
                store.removeOnCooldown(skillId);
                showSkills();
            }, skill.cooldown * KILO);
        }
        if (skill.dot) {
            store.addDot(skillId, skillId, performance.now());
            setTimeout(() => {
                store.removeDot(skillId);
                showSkills();
            }, skill.dot * KILO);
        }
        showSkills();
    }
};

const isMiss = flags => flags.endsWith(1);

const getPriority = () =>
    (JOB_PRIORITY_MAP[selectors.getJob()] &&
        JOB_PRIORITY_MAP[selectors.getJob()]()) ||
    EMPTY_PRIORITY;

export const showSkills = () => {
    view.hideSkills(selectors.getSkills());
    getPriority()
        .getNextSkills()
        .forEach(skillId =>
            view.showSkill(skillId, selectors.getSkillText(skillId))
        );
};

export const onSkillUsage = skillId => {
    const gcdModifier = getPriority().getGCDModifier(skillId);

    if (selectors.triggersGCD(skillId) && selectors.isInstantCast(skillId)) {
        view.renderProgressCircle(
            Math.round(gcdModifier * selectors.getGCD(skillId))
        );
    }
};

export const onStartsCasting = skillId => {
    const gcdModifier = getPriority().getGCDModifier();
    if (selectors.triggersGCD(skillId)) {
        view.renderProgressCircleAsync(
            Math.round(gcdModifier * selectors.getGCD(skillId)),
            Math.round(gcdModifier * selectors.getCastTime(skillId))
        );
    }
};
