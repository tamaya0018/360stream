import { Subscriber } from './subscriber';

const myId            = document.getElementById('my-id');
const listButton      = document.getElementById('list-button');
const buttonArea      = document.getElementById('button-area');
const remoteMediaArea = document.getElementById('remote-media-area');

(async () => {

  const searchParams = new URLSearchParams(window.location.search);
  const me = new Subscriber(searchParams.get('room'), buttonArea, remoteMediaArea);
  await me.initMyContext();

  myId.textContent = me.myInfo.id;

  listButton.onclick = () => {

    me.myRoom.publications.forEach(publication => {
      me.subscribeAndAttach(publication);
    });

    me.myRoom.onStreamPublished.add((e) => {
      me.subscribeAndAttach(e.publication);
    });

  };

})();