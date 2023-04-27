import { nowInSec, SkyWayAuthToken, SkyWayContext, SkyWayRoom, SkyWayStreamFactory, uuidV4 } from '@skyway-sdk/room';

const token = new SkyWayAuthToken({
    jti: uuidV4(),
    iat: nowInSec(),
    exp: nowInSec() + 60 * 60 * 24,
    scope: {
        app: {
            id: '1194851a-7721-4348-951a-f502fd4dccb3',
            turn: true,
            actions: ['read'],
            channels: [
                {
                    id: '*',
                    name: '*',
                    actions: ['write'],
                    members: [
                        {
                            id: '*',
                            name: '*',
                            actions: ['write'],
                            publication: {
                                actions: ['write'],
                            },
                            subscription: {
                                actions: ['write'],
                            },
                        },
                    ],
                    sfuBots: [
                        {
                            actions: ['write'],
                            forwardings: [
                                {
                                    actions: ['write'],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
}).encode('zufyzTSf6JdsD1m4feyiG8id/aju8Hyh7ROgcyHeHKY=');

// create room and publish your video
(async () => {
    const roomNameInput = document.getElementById("room-name");
    const myId = document.getElementById("my-id");
    const joinButton = document.getElementById("join");

    joinButton.onclick = async () => {
        if (roomNameInput.value === '') return;

        const context = await SkyWayContext.Create(token);
        const room = await SkyWayRoom.FindOrCreate(context, {
            type: 'p2p',
            name: roomNameInput.value,
        });
        const me = await room.join();
        myId.textContent = me.id;
        const video = document.getElementById("localVideo");
        await me.publish(video);
    };
})();