import * as selectors from '../state/selectors';
import * as store from '../state/store';
import * as skills from '../service/skills';
import {contains} from './functional-helper';
import {PET_NAMES} from '../config';

export const onLogLine = e => {
    const line = e.line;
    const type = line[0];
    if (type === '03' && line[4] === '0' && !contains(line[3], PET_NAMES)) {
        if (!selectors.isEnemy(line[2])) {
            store.updateEnemy(line[2], {
                id: line[2],
                x: line[17],
                y: line[18],
                z: line[19],
            });
        }
    }

    if (type === '04') {
        store.removeEnemy(line[2]);
    }

    if (type === '26' || type === '30') {
        const effectId = line[2];
        const target = line[8];

        const stacks = selectors.getStacks();

        if (target === selectors.getName()) {
            if (type === '26') {
                store.addBuff(effectId, performance.now(), line[4]);
            } else if (type === '30') {
                store.removeBuff(effectId);
            }
            skills.showSkills();
        }
        if (stacks && stacks[effectId] && target === selectors.getName()) {
            store.updateStack(effectId, type === '30' ? '00' : line[9]);
            skills.showSkills();
        }
    }

    const skillId = line[4];

    if (selectors.isPlayer(line[3]) && selectors.isSkill(skillId)) {
        if (type === '21' || type === '22') {
            skills.onSkillUsage(skillId);
            skills.updateSkills(line[4], line[6], line[8]);
            if (skillId === selectors.getCastingId()) {
                store.setCastingId(null);
            }
        }

        if (type === '20') {
            skills.onStartsCasting(skillId);
            store.setCastingId(line[4]);
            skills.showSkills();
        }

        if (type === '23') {
            store.setCastingId(null);
            skills.showSkills();
        }
    }

    const targetId = line[6];
    const targetCurrentHp = line[24];
    if (selectors.isEnemy(targetId)) {
        if (targetCurrentHp > 0) {
            store.updateEnemy(targetId, {
                id: targetId,
                x: line[40],
                y: line[41],
                z: line[42],
            });
        } else {
            store.removeEnemy(targetId);
        }
    }
};
