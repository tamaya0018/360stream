// List cameras and microphones.
function addVideoDeviceOption() {
  var select = document.getElementById("videoDeviceList");

  // get all video device option to pulldown.
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      videoDevices.forEach(device => {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        var option = document.createElement("option");
        option.text = device.label;
        select.appendChild(option);
      });
    })
    .catch(err => {
      console.log(err.name + ": " + err.message);
    })
}