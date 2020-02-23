// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
        'AMAZON.StopIntent': 'END',
        'AMAZON.PauseIntent': 'PauseIntent',
        'AMAZON.ResumeIntent': 'ResumeIntent',
        'AMAZON.NextIntent': 'NextIntent',
    },
    db: {
        FileDb: {
            pathToFile: '../db/db.json',
        },
    },
};
