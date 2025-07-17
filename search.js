const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

function displayResults(results) {
  hidePlaylists();
  resultArtist.innerHTML = ""; // Limpa os resultados anteriores

  const searchTerm = searchInput.value.toLowerCase();

  // Filtro manual de segurança, mesmo que a API filtre
  const filteredResults = results.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm)
  );

  if (filteredResults.length === 0) {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  filteredResults.forEach((artist) => {
    const card = document.createElement("div");
    card.classList.add("artist-card");

    card.innerHTML = `
      <img src="${artist.urlImg}" alt="${artist.name}" width="100" height="100" style="border-radius: 10px;">
      <p>${artist.name}</p>
    `;

    resultArtist.appendChild(card);
  });

  resultArtist.classList.remove("hidden");
}


function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
