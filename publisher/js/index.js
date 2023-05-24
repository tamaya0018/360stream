import { Publisher } from './publisher';
import { listMediaDevices } from './mediaController';

const myId          = document.getElementById('my-id');
const localVideo    = document.getElementById('local-video');
const cameraList    = document.getElementById('camera-list');
const audioList     = document.getElementById('audio-list');
const listButton    = document.getElementById('list-button');
const publishButton = document.getElementById('publish-button');

(async () => {
  var myInfo, video;
  const searchParams = new URLSearchParams(window.location.search);
  const me = new Publisher(searchParams.get('room'), cameraList);

  myInfo = await me.initMyContext();
  myId.textContent = myInfo.id;

  listButton.onclick = () => {
    listMediaDevices(audioList, 'audioinput');
    listMediaDevices(cameraList, 'videoinput');
  }
  
  publishButton.onclick = async () => {
    await me.publishVideo(myInfo, video);
  }

  cameraList.onchange = async () => {
    video = await me.previewVideo(localVideo);
  }
})();