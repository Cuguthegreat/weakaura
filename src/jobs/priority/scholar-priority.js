import {BASE_GCD} from '../../config';
import * as selectors from '../../state/selectors';
import {pushIf} from '../../service/functional-helper';

export const getScholarPriority = () => ({
    getGCD,
    getNextSkills,
});

const getGCD = () => BASE_GCD;

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