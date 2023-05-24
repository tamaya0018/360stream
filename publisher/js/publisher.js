import { SkyWayStreamFactory } from '@skyway-sdk/room';
import { Member } from '../../js/member';

const cameraList = document.getElementById('camera-list');
const localVideo = document.getElementById('local-video');

const searchParams = new URLSearchParams(window.location.search);
/*
const publisherPrototype = {
  me: new Member(searchParams.get('room')),
  cameraList: document.getElementById('camera-list'),

  previewVideo: async function () {
    this.video = await SkyWayStreamFactory.createCameraVideoStream(
      { deviceId: cameraList.value }
    );
    this.video.attach(localVideo);
    await localVideo.play();
  },
  
  publishVideo: function () {
    this.me.publish(this.video)
      .then( () => {
        console.log("publish success!");
      })
  }
};
*/

