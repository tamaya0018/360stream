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

// listVideoDevices
function listVideoDevices (cameraSelect) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      videoDevices.forEach(device => {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        var option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label;
        cameraSelect.appendChild(option);
      });
    })
    .catch(err => {
      console.log(err.name + ": " + err.message);
    })
}

(async () => {
  const localVideo = document.getElementById('local-video');
  const roomNameInput = document.getElementById('room-name');
  const cameraList = document.getElementById('camera-list')

  const myId = document.getElementById('my-id');
  const joinButton = document.getElementById('join');

  listVideoDevices(cameraList);

  var video;

  cameraList.onchange = async () => {
    console.log(cameraList.value);

    video = await SkyWayStreamFactory.createCameraVideoStream(
      { deviceId: cameraList.value }
    );

    video.attach(localVideo);
    await localVideo.play();
  }

  joinButton.onclick = async () => {
    if (roomNameInput.value === '') return;

    const context = await SkyWayContext.Create(token);
    const room = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: roomNameInput.value,
    });
    const me = await room.join();

    myId.textContent = me.id;

    await me.publish(video);
  };
})();