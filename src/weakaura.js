import '../../../resources/common';
import * as playerChange from './service/player-change';
import * as logLine from './service/log-line';
import * as combatData from './service/combat-data';

window.addOverlayListener('onPlayerChangedEvent', e => {
    playerChange.onPlayerChanged(e);
});

window.addOverlayListener('LogLine', e => {
    logLine.onLogLine(e);
});

window.addOverlayListener('CombatData', e => {
    combatData.onCombatData(e);
});

window.addOverlayListener('EnmityTargetData', e => {
    combatData.onEnmityTargetData(e)
});

window.addOverlayListener('ChangePrimaryPlayer', e => {
    combatData.onChangePrimaryPlayer();
});
