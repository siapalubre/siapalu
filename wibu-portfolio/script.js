const animeList = ["Attack on Titan", "Steins;Gate", "Your Name", "Jujutsu Kaisen", "Demon Slayer"];
const donghuaList = ["Link Click", "The King's Avatar", "Fog Hill of Five Elements", "White Cat Legend", "Battle Through The Heavens"];
const komikList = ["Solo Leveling", "One Punch Man", "Omniscient Reader", "Tales of Demons and Gods", "Si Juki"];

function isiList(id, data) {
  const ul = document.getElementById(id);
  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function showTab(id) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  document.querySelectorAll(".tab").forEach(el => el.classList.remove("active"));

  document.getElementById(id).classList.remove("hidden");
  event.target.classList.add("active");
}

function kirimPesan() {
  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;
  if (nama && pesan) {
    const box = document.getElementById("chat-box");
    const newMsg = document.createElement("div");
    newMsg.innerHTML = `<strong>${nama}</strong>: ${pesan}`;
    box.appendChild(newMsg);
    document.getElementById("pesan").value = "";
    box.scrollTop = box.scrollHeight;
  }
}
