const state = {
    job: null,
    skills: null,
    name: null,
    level: null,
    hP: null,
    mP: null,
    jobDetail: null,
    previousSkillId: null,
    previousSkillTargetId: null,
    previousSkillTimestamp: null,
    comboStarter: null,
    comboBreaker: null,
    buffs: null,
    comboTimeout: null,
    stacks: {},
    castingId: null,
    onCooldown: [],
    dots: {},
    targetHp: null,
    targetId: null,
    groupDps: null,
    enemies: {},
};

export const getState = () => state;

export const setJob = job => {
    state.job = job;
};

export const setSkills = skills => {
    state.skills = skills;
};

export const setName = name => {
    state.name = name;
};

export const setLevel = level => {
    state.level = level;
};

export const setHP = hP => {
    state.hP = hP;
};

export const setMP = mP => {
    state.mP = mP;
};

export const setJobDetail = jobDetail => {
    state.jobDetail = jobDetail;
};

export const setPreviousSkillData = (skillId, targetId, timestamp) => {
    state.previousSkillId = skillId;
    state.previousSkillTargetId = targetId;
    state.previousSkillTimestamp = timestamp;
};

export const resetPreviousSkillData = () => {
    state.previousSkillId = null;
    state.previousSkillTargetId = null;
    state.previousSkillTimestamp = null;
};

export const setComboStarter = comboStarter => {
    state.comboStarter = comboStarter;
};

export const setComboBreaker = comboBreaker => {
    state.comboBreaker = comboBreaker;
};

export const addBuff = (effectId, timestamp, duration) => {
    state.buffs = {
        ...state.buffs,
        [effectId]: {effectId, timestamp, duration},
    };
};

export const removeBuff = skillId => {
    delete state.buffs[skillId];
};

export const setComboTimeout = comboTimeout => {
    state.comboTimeout = comboTimeout;
};

export const setStacks = stacks => {
    state.stacks = stacks;
};

export const updateStack = (stackId, value) => {
    state.stacks = {
        ...state.stacks,
        [stackId]: {current: value, maximum: state.stacks[stackId]},
    };
};

export const setCastingId = castingId => {
    state.castingId = castingId;
};

export const addOnCooldown = skillId => {
    state.onCooldown = [...state.onCooldown, skillId];
};

export const removeOnCooldown = skillId => {
    state.onCooldown = state.onCooldown.filter(cdId => cdId !== skillId);
};

export const addDot = (skillId, targetId, effectId) => {
    state.dots = {
        ...state.dots,
        [skillId]: {skillId, targetId, effectId},
    };
};

export const removeDot = skillId => {
    delete state.dots[skillId];
};

export const setTargetHp = targetHp => {
    state.targetHp = targetHp;
};

export const setTargetId = targetId => {
    state.targetId = targetId;
};

export const setEncounterDps = groupDps => {
    state.groupDps = groupDps;
};

export const updateEnemy = (enemyId, enemy) => {
    state.enemies[enemyId] = enemy;
}

export const removeEnemy = enemyId => {
    delete state.enemies[enemyId];
}

export const resetEnemies = () => {
    state.enemies = {};
}
