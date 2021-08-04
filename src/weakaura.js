import '../../../resources/common';
import * as playerChange from './service/player-change';
import * as logLine from './service/log-line';
import * as store from './state/store';
import * as selectors from './state/selectors';
import * as skills from './service/skills';

export const KILO = 1000;
export const BASE_GCD = 2.5 * KILO;

window.addOverlayListener('onPlayerChangedEvent', e => {
    playerChange.onPlayerChanged(e);
});

window.addOverlayListener('LogLine', e => {
    logLine.OnLogLine(e);
});

window.addOverlayListener('LogLine', e => {
    logLine.OnLogLine(e);
});

window.addOverlayListener('CombatData', e => {
    e.Encounter && store.setEncounterDps(e.Encounter.DPS);
});

window.addOverlayListener('EnmityTargetData', e => {
    const newTargetId = e.Target && e.Target.ID;
    e.Target && store.setTargetHp(e.Target.CurrentHP);

    if (newTargetId && selectors.getTargetId() !== newTargetId) {
        store.setTargetId(newTargetId);
        // TODO clean this up
        selectors.getSkills() && skills.showSkills();
    }
});
