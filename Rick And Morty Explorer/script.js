const apiurl = 'https://rickandmortyapi.com/api/character'
let currpageUrl= apiurl;
let characters = []

const container = document.getElementById("Character-container")
const searchInput = document.getElementById("search")
const statusFilter = document.getElementById("status")
const prevBtn = document.getElementById("pre-btn")
const nextBtn = document.getElementById("next-btn")

async function fetchcharacter(url) {
    const res = await fetch(url)
    const data = await res.json();
    console.log(data);
    characters=data.results;
    displaycharacter(characters);
    prevBtn.disable = !data.info.prev;
    nextBtn.disable = !data.info.next;
    currpageUrl = url;
}

function displaycharacter(chars){
    container.innerHTML="";
    chars.forEach(char => {
        const card=document.createElement('div');
        card.className='card';
        card.innerHTML=`
        <img src="${char.img}" alt="${char.name}">
        <h3>${char.name}</h3>
        <p>Species: ${char.species}</p>
        <p>Status: <span class="status ${char.status.toLowerCase()}">${char.status}</span></p>
        <p>Location: ${char.location.name}</p>`;

        card.onclick = ()=> showDetails(char);
        container.appendChild(card);       
    });
}
function showDetails(char){
    const modelContent = document.getElementById('modelcontent');
    modelContent.innerHTML=`
      <h2>${char.name}</h2>
      <img src="${char.img}" alt="${char.name}">
    <p>Gender: ${char.gender}</p>
    <p>Status: ${char.status}</p>
    <p>Species: ${char.species}</p>
    <p>Location: ${char.location.name}</p>
    <p>Episodes:${char.episode.length}</p>`;

    document.getElementById('Character-model').style.display = 'block'
}

function closeModel(){
    document.getElementById('Character-model').style.display = 'block';
}
document.getElementById('search').addEventListener('input', ()=>filterCharacters());
document.getElementById('status').addEventListener('change',()=>filterCharacters());
prevBtn.onclick=()=>fetchcharacter(prevBtn.disable?currpageUrl : new URL(currpageUrl).searchParams.get('prev'));
nextBtn.onclick=()=> fetchcharacter(nextBtn.disable?currpageUrl : new URL(currpageUrl).searchParams.get('next'));

function filterCharacters(){
    const searchText = searchInput.ariaValueMax.toLowerCase();
    const status = statusFilter.ariaValueMax;
    const filtered = characters.filter(c=> c.name.toLowerCase().includes(searchInput) && (status===''|| c.status===status));

    displaycharacter(filtered)
}

fetchcharacter(apiurl)