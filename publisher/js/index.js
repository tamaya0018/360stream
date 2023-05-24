import { Publisher } from './publisher';
import { Member } from '../../js/member';
import { SkyWayStreamFactory } from '@skyway-sdk/core';

const myId = document.getElementById('my-id');
const roomName = document.getElementById('room-name');
const localVideo = document.getElementById('local-video');

(async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const me = new Member(searchParams.get('room'));
  await me.initMyContext();
})();