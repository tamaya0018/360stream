import { nowInSec, SkyWayAuthToken, SkyWayContext, SkyWayRoom, SkyWayStreamFactory, uuidV4 } from '@skyway-sdk/room';
import { Member } from '../../js/member';

const subscriberPrototype = {

  subscribeAndAttach: function (publication) {
    console.log(publication.publisher.id);
    console.log(this.myInfo);
    if (publication.publisher.id === this.myInfo.id) return;
    
    const subscribeButton = document.createElement('button');
    subscribeButton.textContent = `${publication.publisher.id}: ${publication.contentType}`;

    this.buttonArea.appendChild(subscribeButton);

    subscribeButton.onclick = async() => {
      const { stream } = await this.myInfo.subscribe(publication.id);

      let newMedia;
      switch (stream.track.kind) {
        case 'video':
          newMedia = document.getElementById('video');
          break;
        case 'audio':
          newMedia = document.createElement('audio');
          newMedia.controls = true;
          newMedia.autoplay = true;
          break;  
        default:
          return;
      }
      stream.attach(newMedia);
      this.remoteMediaArea.appendChild(newMedia);
    }
  },

}

export function Subscriber(roomName, buttonArea, remoteMediaArea) {
  Member.call(this, roomName);
  this.buttonArea = buttonArea;
  this.remoteMediaArea = remoteMediaArea;
}

Subscriber.prototype = Object.create(Member.prototype);
Subscriber.prototype.constructor = Subscriber;

Object.assign(Subscriber.prototype, subscriberPrototype);