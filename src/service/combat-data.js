import * as store from '../state/store';
import * as selectors from '../state/selectors';
import * as skills from './skills';
import {contains} from './functional-helper';
import {PET_NAMES} from '../config';

export function onChangePrimaryPlayer() {
    store.resetEnemies();
}

export const onCombatData = e => {
    if (!e.isActive) {
        store.resetEnemies();
    }

    e.Encounter && store.setEncounterDps(e.Encounter.DPS);
};

export const onEnmityTargetData = e => {
    const target = e.Target;
    const targetId = target && e.Target.ID;
    if (target && !target.job && !contains(target.name, PET_NAMES)) {
        store.setTargetHp(target.CurrentHP);

        if (selectors.isEnemy(targetId)) {
            if (target.CurrentHP > 0) {
                store.updateEnemy(targetId, {
                    id: targetId,
                    x: target.PosX,
                    y: target.PosY,
                    z: target.PosZ,
                });
            } else {
                store.removeEnemy(targetId);
            }
        }
    }

    if (targetId && selectors.getTargetId() !== targetId) {
        store.setTargetId(targetId);
        // TODO clean this up
        selectors.getSkills() && skills.showSkills();
    }
};