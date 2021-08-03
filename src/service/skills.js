import * as paladinSkills from '../jobs/skills/paladin-skills';
import * as samuraiSkills from '../jobs/skills/samurai-skills';
import * as selectors from '../state/selectors';
import * as store from '../state/store';
import {KILO} from '../weakaura';
import * as view from '../view/view';
import * as samuraiPriority from '../jobs/priority/samurai-priority';
import {contains} from './functional-helper';
import {isComboStarter} from '../state/selectors';

// TODO Split into skills update and init
const JOB_SKILLS_MAP = {
    SAM: samuraiSkills.getSamuraiSkills,
};

const JOB_PRIORITY_MAP = {
    SAM: samuraiPriority.getSamuraiPriority,
};

const JOB_COMBOS_MAP = {
    SAM: samuraiSkills.getSamuraiCombo,
};

const JOB_STACKS_MAP = {
    SAM: samuraiSkills.getSamuraiStacks,
};

export const setSkillsForJob = newJob => {
    const skills = JOB_SKILLS_MAP[newJob] && JOB_SKILLS_MAP[newJob]();

    if (!skills) {
        return;
    }

    const combosGetter = JOB_COMBOS_MAP[newJob];
    const stacksGetter = JOB_STACKS_MAP[newJob];

    store.setSkills(skills);

    if (combosGetter) {
        store.setComboBreaker(combosGetter().comboBreaker);
        store.setComboStarter(combosGetter().comboStarter);
    }

    if (stacksGetter) {
        store.setStacks(stacksGetter());
    }

    for (let skillId in skills) {
        const skill = skills[skillId];
        view.renderSkill(
            skillId,
            skill.css || skill.text,
            isComboStarter(skillId) ? skill.text : null,
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
    const skill = selectors.getSkills()[skillId];
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

const getPriority = () => JOB_PRIORITY_MAP[selectors.getJob()]();

export const showSkills = () => {
    view.hideSkills(selectors.getSkills());
    getPriority().forEach(skillId =>
        view.showSkill(skillId, selectors.getSkillText(skillId))
    );
};
