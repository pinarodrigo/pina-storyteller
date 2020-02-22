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
    endpoint: 'https://amykvvjx7b.execute-api.eu-central-1.amazonaws.com/default/grimm_skill_jovo',
};
