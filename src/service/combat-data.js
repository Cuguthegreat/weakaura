import * as store from '../state/store';
import * as selectors from '../state/selectors';
import * as skills from './skills';
import {contains} from './functional-helper';

const PET_NAMES = [
    'Emerald Carbuncle',
    'Topaz Carbuncle',
    'Ifrit-Egi',
    'Titan-Egi',
    'Garuda-Egi',
    'Eos',
    'Selene',
    'Rook Autoturret',
    'Bishop Autoturret',
    'Demi-Bahamut',
    'Demi-Phoenix',
    'Seraph',
    'Moonstone Carbuncle',
    'Esteem',
    'Automaton Queen',
    'Bunshin',
];

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
        if (target.CurrentHP > 0) {
            !selectors.isEnemy(targetId) &&
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

    if (targetId && selectors.getTargetId() !== targetId) {
        store.setTargetId(targetId);
        // TODO clean this up
        selectors.getSkills() && skills.showSkills();
    }
};