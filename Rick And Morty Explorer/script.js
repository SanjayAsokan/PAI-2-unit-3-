const apiurl = 'https://rickandmortyapi.com/api/character';
    let characters = [];

    const container = document.getElementById("Character-container");
    const searchInput = document.getElementById("search");
    const statusFilter = document.getElementById("status");

    async function fetchCharacters(url) {
      const res = await fetch(url);
      const data = await res.json();
      characters = data.results;
      displayCharacters(characters);
    }

    function displayCharacters(chars) {
      container.innerHTML = "";
      chars.forEach(char => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${char.image}" alt="${char.name}">
          <h3>${char.name}</h3>
          <p>Species: ${char.species}</p>
          <p>Status: <span class="status ${char.status.toLowerCase()}">${char.status}</span></p>
          <p>Location: ${char.location.name}</p>
        `;
        container.appendChild(card);
      });
    }

    function filterCharacters() {
      const searchText = searchInput.value.toLowerCase();
      const status = statusFilter.value;
      const filtered = characters.filter(c =>
        c.name.toLowerCase().includes(searchText) &&
        (status === '' || c.status === status)
      );
      displayCharacters(filtered);
    }

    searchInput.addEventListener("input", filterCharacters);
    statusFilter.addEventListener("change", filterCharacters);

    fetchCharacters(apiurl);
