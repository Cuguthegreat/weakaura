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
    const cooldowns = [
        ...pushIf(
            !selectors.isCasting() && !selectors.isOnCooldown('4099'),
            '4099'
        ),
        ...pushIf(
            !selectors.isCasting() && !selectors.isOnCooldown('409A'),
            '409A'
        ),
        ...pushIf(
            !selectors.isCasting() && !selectors.isOnCooldown('A6'),
            'A6'
        ),
        ...pushIf(
            !selectors.isCasting() &&
                !selectors.isOnCooldown('A7') &&
                aetherflowStacks > 0,
            'A7'
        ),
    ];

    return cooldowns.filter(
        skillId => selectors.getSkill(skillId).level <= level
    );
};