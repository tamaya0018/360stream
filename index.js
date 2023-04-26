/*
(async function () {


  // MediaStream取得 
  const localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  const localVideo = document.getElementById('localVideo');
  localVideo.srcObject = localMediaStream;
})()
*/

// List cameras and microphones.
navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(device => {
      console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
    });
  })
  .catch(err => {
    console.log(err.name + ": " + err.message);
  })