// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
        nlu: 'alexa',
        manifest: {
            apis: {
                custom: {
                    interfaces: [
                        {
                            type: 'AUDIO_PLAYER',
                        },
                    ],
                },
            },
        },
    },
    defaultStage: 'local',
    stages: {
        local: {
            endpoint: '${JOVO_WEBHOOK_URL}'
        },
        dev: {
            alexaSkill: {
                endpoint: 'https://7s2e4i9qfh.execute-api.eu-central-1.amazonaws.com/default/grimm_skill_jovo_dev',
            },
        },
        prod: {
            alexaSkill: {
                endpoint: 'https://amykvvjx7b.execute-api.eu-central-1.amazonaws.com/default/grimm_skill_jovo',
            },
        },
    },
};
