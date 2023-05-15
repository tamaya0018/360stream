function addItem() {
  const nameInput = document.getElementById("add-item");
  const list = document.getElementById("test-list");

  let option = document.createElement("option");
  option.value = nameInput.value;
  list.appendChild(option);
}