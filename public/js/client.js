const socket = io();

socket.on("Hello", (welcomeMsg) => {
  console.log(welcomeMsg);
});

const input = document.getElementById("inputName");
const form = document.getElementById("form");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("response", {
    id: socket.id,
    name: input.value,
    responseMsg: responseMsg.value,
  });
  input.disabled = "disabled";
  responseMsg.disabled = "disabled";
  submit.disabled = "disabled";
});
