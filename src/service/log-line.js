import * as selectors from '../state/selectors';
import * as store from '../state/store';
import * as skills from '../service/skills';
import {clearScreen} from '../view/view';
import * as view from '../view/view';
import {contains} from './functional-helper';
import {isEnemy} from '../state/selectors';

const updateEnemy = ({id, x, y, z, hp}) => {
    if (hp >= 0) {
        store.updateEnemy(id, {id, x, y, z});
    } else {
        store.removeEnemy(id);
    }

    skills.showSkills();
};

export const onLogLine = e => {
    const line = e.line;
    const type = line[0];

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
            view.clearScreen()
            skills.showSkills();
        }
    }

    if (type === '25') {
        store.removeEnemy(line[2]);
    }

    if (type === '21' || type === '22') {
        const casterId = line[2];
        const targetId = line[6];

        casterId.startsWith('4') && updateEnemy({
            id: casterId,
            x: line[40],
            y: line[41],
            z: line[42],
            hp: line[34],
        });

        targetId.startsWith('4') && updateEnemy({
            id: targetId,
            x: line[30],
            y: line[31],
            z: line[32],
            hp: line[24],
        });
    }
};

