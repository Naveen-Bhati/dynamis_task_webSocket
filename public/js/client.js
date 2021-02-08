const socket = io();

socket.on("Hello", (welcomeMsg) => {
  console.log(welcomeMsg);
});

const input = document.getElementById("inputName");
const sendBtn = document.getElementById("sendBtn");
const responseMsg = document.getElementById("responseMsg");

sendBtn.addEventListener("click", () => {
  socket.emit("response", {
    id: socket.id,
    name: input.value,
    responseMsg: responseMsg.value,
  });
});
