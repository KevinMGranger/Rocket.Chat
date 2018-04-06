import { Meteor } from 'meteor/meteor';
import irc from "./irc_server";

export const name = 'rocketchat-irc-bridge';

let clients = irc.startServer();

RocketChat.callbacks.add('afterSaveMessage',
    (message, constant, ...rest) => {
        console.log("saved message:", message, constant, rest)

        for (let client of clients) {
            client.write(`${message.u.username} said ${message.msg}`);
        }
    },
    RocketChat.callbacks.priority.LOW,
    'logMessageSave');

// Meteor.startup(() => {
// we should start listening here
// });