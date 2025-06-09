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

  const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "NAMA_PROJECT.firebaseapp.com",
    databaseURL: "https://NAMA_PROJECT.firebaseio.com",
    projectId: "NAMA_PROJECT",
    storageBucket: "NAMA_PROJECT.appspot.com",
    messagingSenderId: "123456789",
    appId: "APP_ID"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const namaInput = document.querySelector("input[placeholder='Anonim']");
  const pesanInput = document.querySelector("input[placeholder='Pesan']");
  const btnKirim = document.querySelector("button");

  btnKirim.addEventListener("click", () => {
    const nama = namaInput.value || "Anonim";
    const pesan = pesanInput.value;

    if (!pesan) return;

    const waktu = new Date().toISOString();
    db.ref("pesan").push({ nama, pesan, waktu });

    pesanInput.value = "";
  });

  // Menampilkan pesan secara realtime
  const outputDiv = document.querySelector(".forum-output");
  db.ref("pesan").on("value", (snapshot) => {
    const data = snapshot.val();
    outputDiv.innerHTML = "";

    for (let id in data) {
      const item = data[id];
      outputDiv.innerHTML += `<p><b>${item.nama}:</b> ${item.pesan}</p>`;
    }
  });
