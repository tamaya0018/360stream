import { SkyWayContext, SkyWayRoom } from '@skyway-sdk/room';
import { getToken } from './generateToken';

const memberPrototype = {
  initMyContext: async function () {
    const context = await SkyWayContext.Create(getToken());
    const room = await SkyWayRoom.FindOrCreate(context, {
      type: 'p2p',
      name: this.roomName,
    });
    const myInfo = await room.join();
    this.myInfo = myInfo;
    this.myRoom = room;
  },
};

export function Member(roomName) {
  this.roomName = roomName;
}

Object.assign(Member.prototype, memberPrototype);