import { Publisher } from './publisher';
import { listMediaDevices } from './mediaController';

const myId               = document.getElementById('my-id');
const localVideo         = document.getElementById('local-video');
const cameraList         = document.getElementById('camera-list');
const audioList          = document.getElementById('audio-list');
const listButton         = document.getElementById('list-button');
const publishVideoButton = document.getElementById('publish-video-button');
const publishAudioButton = document.getElementById('publish-audio-button');

(async () => {

  const searchParams = new URLSearchParams(window.location.search);
  const me = new Publisher(searchParams.get('room'), cameraList, audioList);
  await me.initMyContext();

  myId.textContent = me.myInfo.id;

  listButton.onclick = () => {
    listMediaDevices(audioList, 'audioinput');
    listMediaDevices(cameraList, 'videoinput');
  };
  
  publishVideoButton.onclick = async () => {
    await me.publishVideo();
  };

  publishAudioButton.onclick = async () => {
    await me.publishAudio();
  };

  cameraList.onchange = async () => {
    await me.previewVideo(localVideo);
  };

  audioList.onchange = async () => {
    await me.previewAudio();
  };

})();