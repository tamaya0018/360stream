window.pageTransition = pageTransition;

function pageTransition(role) {
  var room_name = document.getElementById("room-name").value;
  if (room_name === '') {
    console.error('fill room name input');
    return;
  }
  var url = "./" + role + "?room=" + room_name;
  window.location.href = url;
}