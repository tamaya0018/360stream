import { SkyWayStreamFactory } from '@skyway-sdk/room';
import { Member } from '../../js/member';

const publisherPrototype = {
  previewVideo: async function (localVideo) {
    const video = await SkyWayStreamFactory.createCameraVideoStream(
      { deviceId: this.cameraList.value }
    );
    video.attach(localVideo);
    await localVideo.play();
    return video;
  },
  
  publishVideo: function (myInfo, video) {
    myInfo.publish(video)
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