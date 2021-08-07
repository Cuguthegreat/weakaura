import * as selectors from '../../state/selectors';
import {pushIf} from '../../service/functional-helper';

export const getScholarPriority = () => ({
    getGCDModifier,
    getNextSkills,
});

const getGCDModifier = () => 1;

const getNextSkills = () => {
    const level = selectors.getLevel();
    const aetherflowStacks = selectors.getJobDetail().aetherflowStacks;
    const simpleCooldowns = ['4099', '409A', 'A6', '1D8A', '1D89'].filter(
        cd => !selectors.isOnCooldown(cd)
    );
    const cooldowns = [
        ...simpleCooldowns,
        ...pushIf(
            !selectors.isCasting() &&
                !selectors.isOnCooldown('A7') &&
                aetherflowStacks > 0,
            'A7'
        ),
    ];

    return selectors.isCasting()
        ? ['1D8A']
        : cooldowns.filter(
              skillId => selectors.getSkill(skillId).level <= level
          );
};