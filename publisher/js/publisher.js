import { SkyWayStreamFactory } from '@skyway-sdk/room';
import { Member } from '../../js/member';

const publisherPrototype = {

  previewVideo: async function (localVideo) {
    this.video = await SkyWayStreamFactory.createCameraVideoStream(
      { deviceId: this.cameraList.value }
    );
    this.video.attach(localVideo);
    await localVideo.play();
  },
  
  publishVideo: function () {
    this.myInfo.publish(this.video)
      .then( () => {
        console.log("publish success!");
      })
  }
  
};

export function Publisher(roomName, cameraList) {
  Member.call(this, roomName);
  this.cameraList = cameraList;
}

Publisher.prototype = Object.create(Member.prototype);
Publisher.prototype.constructor = Publisher;

Object.assign(Publisher.prototype, publisherPrototype);