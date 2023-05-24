export function listMediaDevices (mediaList, mediaType) {

  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const narrowedDevices = devices.filter(device => device.kind === mediaType);

      narrowedDevices.forEach(device => {
        const option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label;
        mediaList.appendChild(option);
      });
    })
    .catch(err => {
      console.log(err.name + ": " + err.message);
    })
}