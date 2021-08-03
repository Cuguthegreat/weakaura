import * as store from '../state/store';
import * as selectors from '../state/selectors';
import * as skills from './skills';

const haveJobDetailChanged = newJobDetail => {
    const oldJobDetail = selectors.getJobDetail();

    if (!oldJobDetail) {
        return true;
    }

    for (let detail in newJobDetail) {
        if (newJobDetail[detail] !== oldJobDetail[detail]) {
            return true;
        }
    }

    return false;
};

export const onPlayerChanged = e => {
    const newJob = e.detail.job;
    store.setName(e.detail.name);
    store.setLevel(e.detail.level);
    store.setHP(e.detail.currentHP);
    store.setMP(e.detail.currentMP);

    if (newJob !== selectors.getJob()) {
        store.setJob(newJob);
        cleanUpOldClass();
        skills.setSkillsForJob(newJob);
    }

    const newJobDetails = e.detail.jobDetail;

    if (newJobDetails && haveJobDetailChanged(newJobDetails)) {
        store.setJobDetail(newJobDetails);
        skills.showSkills();
    }
};

const cleanUpOldClass = () => {
    for (let skillId in selectors.getSkills()) {
        // TODO move to view
        const node = document.getElementById(skillId);

        node != null && node.remove();
    }
};
