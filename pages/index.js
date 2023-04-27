
// List cameras and microphones.
function listVideoDeviceOption() {
  var list = document.getElementById("videoDeviceList");

  // initialize list
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  // get all video device option to pulldown.
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      videoDevices.forEach(device => {
        //console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        var option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label;
        list.appendChild(option);
      });
    })
    .catch(err => {
      console.log(err.name + ": " + err.message);
    })
}

// show video
async function showVideo() {
  const id = document.getElementById('videoDeviceList').value;
  const localMediaStream = await navigator.mediaDevices.getUserMedia(
    {
      video: { deviceId: id }
    }
  );
  const localVideo = document.getElementById('localVideo');
  localVideo.srcObject = localMediaStream;
}

// stop video
function stopVideo() {
  const tracks = document.getElementById('localVideo').srcObject.getTracks();
  tracks.forEach(track => {
    track.stop();
  });

  document.getElementById('localVideo').srcObject = null;
}
