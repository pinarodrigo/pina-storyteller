'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { DynamoDb } = require('jovo-db-dynamodb');

const app = new App();

const espanol_array = [
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/caperucita_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/Blancanieves_vbr.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/gato-botas.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/La-cenicienta_vbr.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/Pinocho_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/huevos-oro_vbr.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/tres-ositos_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/soldadito-plomo.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/tres-cerditos_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/patito.feo_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/lobo-zorro-burro_vbr.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/hamelin_64kb.mp3',
    'https://ia800903.us.archive.org/29/items/Cuentos-infantiles/alibbaba_64kb.mp3'
];

const deutsch_array = [
    ''
];

function callCuento(filter) {
    //TODO: Add logic to filter stories per language, taking input from user 
    let cuento = '';

    if (filter == 1) {
        cuento = deutsch_array[Math.floor(Math.random() * deutsch_array.length)];
    } else {
        cuento = espanol_array[Math.floor(Math.random() * espanol_array.length)];
    }

    return cuento;
}

app.use(
    new Alexa(),
    new JovoDebugger(),
    new FileDb(),
    new DynamoDb(),
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        require('dotenv').config();

        this.$speech.addText(this.t('welcome'));
        this.$reprompt.addText(this.t('sino'));

        this.followUpState('TellStoryState')
            .ask(this.$speech, this.$reprompt);
    },
    TellStoryState: {
        YesIntent() {
            return this.toIntent('PlayIntent');
        },
        NoIntent() {
            this.followUpState('EndState')
                .ask(this.$speech);
        },
    },
    EndState: {
        END() {
            this.$speech.addText('Adios!');
            // do something
        }
    },
    PlayIntent() {
        this.$user.$data.cuento = callCuento(0);
        this.$alexaSkill.$audioPlayer
            .setOffsetInMilliseconds(0)
            .play(this.$user.$data.cuento, 'token');
    },
    PauseIntent() {
        this.$alexaSkill.$audioPlayer.stop();

        // Save offset to database
        this.$user.$data.offset = this.$alexaSkill.$audioPlayer.getOffsetInMilliseconds();
        this.tell(this.t('pause'));
    },
    ResumeIntent() {
        this.$alexaSkill.$audioPlayer
            .setOffsetInMilliseconds(this.$user.$data.offset)
            .play(this.$user.$data.cuento, 'token')
            .tell(this.t('resuming'));
    },
    NextIntent() {
        this.$user.$data.cuento = callCuento(0);
        this.$alexaSkill.$audioPlayer
            .setOffsetInMilliseconds(0)
            .play(this.$user.$data.cuento, 'token');
    },
    AUDIOPLAYER: {
        'AlexaSkill.PlaybackStarted'() {
            console.log('AlexaSkill.PlaybackStarted');
        },

        'AlexaSkill.PlaybackNearlyFinished'() {
            console.log('AlexaSkill.PlaybackNearlyFinished');
        },

        'AlexaSkill.PlaybackFinished'() {
            console.log('AlexaSkill.PlaybackFinished');
            this.$alexaSkill.$audioPlayer.stop();
        },

        'AlexaSkill.PlaybackStopped'() {
            console.log('AlexaSkill.PlaybackStopped');
        },

        'AlexaSkill.PlaybackFailed'() {
            console.log('AlexaSkill.PlaybackFailed');
        },
    },
});


module.exports.app = app;
