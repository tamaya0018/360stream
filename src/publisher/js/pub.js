import { nowInSec, SkyWayAuthToken, SkyWayContext, SkyWayRoom, SkyWayStreamFactory, StreamFactory, uuidV4 } from '@skyway-sdk/room';

let me, video;
const localVideo = document.getElementById('local-video');
const cameraList = document.getElementById('camera-list');
const listButton = document.getElementById('list-button');
const joinButton = document.getElementById('join-button');
const publishButton = document.getElementById('publish-button');

// get auth token
// ! this function need to hide
function getToken () {
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

  return token;
}

// list video-devices
listButton.onclick = () => {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      videoDevices.forEach(device => {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        const option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label;
        cameraList.appendChild(option);
      });
    })
    .catch(err => {
      console.log(err.name + ": " + err.message);
    })
}

// previw video
// automatically preview video when change selection
cameraList.onchange = async () => {
  console.log(cameraList.value);
  video = await SkyWayStreamFactory.createCameraVideoStream(
    { deviceId: cameraList.value }
  );
  video.attach(localVideo);
  await localVideo.play();
}

// join room
joinButton.onclick = async () => {
  const roomNameInput = document.getElementById('room-name');
  const myId = document.getElementById('my-id');
  if (roomNameInput.value === '') return;

  const context = await SkyWayContext.Create(getToken());
  const room = await SkyWayRoom.FindOrCreate(context, {
    type: 'p2p',
    name: roomNameInput.value,
  });
  me = await room.join();
  myId.textContent = me.id;
}

// publish video
publishButton.onclick = () => {
  me.publish(video)
    .then( () => {
      console.log("publish success!");
    })
}