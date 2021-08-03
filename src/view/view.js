export const showSkill = (skillId, skillText) => {
    const element = document.getElementById(skillId);

    if (element) {
        element.innerText = skillText;
    }
};

export const hideSkills = skillIds => {
    for (let skillId in skillIds) {
        const element = document.getElementById(skillId);

        if (element) {
            element.innerText = null;
        }
    }
};

export const renderSkill = (skillId, css, text, isSmall) => {
    const node = document.createElement('div');
    const cssId = css;
    node.id = skillId;
    node.className = isSmall
        ? `skill skill--${cssId} skill--small`
        : `skill skill--${cssId}`;
    node.innerText = text;
    getContainer().appendChild(node);
};

export const getContainer = () => document.getElementById('container');
