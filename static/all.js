(function () {
    const profileImage = "../images/pfp.jpg"; 

    document.querySelectorAll(".pfp").forEach(img => {
      img.src = profileImage;
    });
  })();


const body = document.querySelector('body');
const info = document.querySelector('.info-background');
const option = document.querySelector('.option');

function copyLink() {
    navigator.clipboard.writeText('lism.vercel.app');
    hide(option);
}

function show(element) {
    element.style.display = 'flex';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 1);
}

function hide(element) {
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none'
    }, 300);
}

function updateCount(count) {
    const countElement = document.querySelector('.count');
    if (countElement) {
        countElement.textContent = `${count} lists`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Determine which page we're on and load the appropriate JSON
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Map pages to their JSON files
    const pageToJsonMap = {
        'anime': '../data/anime.json',
        'movie': '../data/movie.json',
        'music': '../data/music.json',
        'game': '../data/game.json',
        'channel': '../data/channel.json',
        'books': '../data/books.json',
        'manga': '../data/manga.json',
        'manhwa': '../data/manhwa.json',
        'animem': '../data/animem.json',
        'series': '../data/series.json'
    };

    const jsonFile = pageToJsonMap[currentPage];
    
    if (jsonFile) {
        console.log(`Loading data for ${currentPage} from ${jsonFile}`);
        loadSectionData(jsonFile);
    } else if (currentPage === 'index.html') {
        // Index page doesn't need to load item data
        console.log("Index page - no item data to load");
    }
});

function loadSectionData(jsonFile) {
    fetch(jsonFile)
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Successfully parsed JSON:", data);
            
            // Determine the section ID and class name based on the JSON file
            const sectionInfo = getSectionInfo(jsonFile);
            if (!sectionInfo) return;
            
            const { sectionId, className } = sectionInfo;
            const sectionEl = document.getElementById(sectionId);
            
            console.log(`Looking for section ${sectionId}:`, sectionEl);
            
            if (!sectionEl) {
                console.log(`Section ${sectionId} not found in this page`);
                return;
            }

            if (!Array.isArray(data)) {
                console.log(`No valid array data found in ${jsonFile}:`, data);
                return;
            }

            // Update the count for this section
            updateCount(data.length);

            // Populate the section with items
            data.forEach((item, index) => {
                try {
                    const link = document.createElement("a");
                    link.classList.add(className);
                    link.href = item.url;
                    link.target = "_blank";

                    const coverImg = document.createElement("img");
                    coverImg.classList.add("cover");
                    coverImg.src = item.cover;
                    coverImg.alt = item.title;
                    coverImg.loading = "lazy";
                    link.appendChild(coverImg);

                    const title = document.createElement("p");
                    title.classList.add("title");
                    title.textContent = item.title;
                    link.appendChild(title);

                    const releaseDate = document.createElement("p");
                    releaseDate.classList.add("release");
                    const year = new Date(item.release).getFullYear();
                    releaseDate.textContent = year;
                    link.appendChild(releaseDate);

                    sectionEl.appendChild(link);
                    console.log(`Successfully added ${item.title} to ${sectionId}`);
                } catch (err) {
                    console.error(`Error adding item ${index} to ${sectionId}:`, err);
                }
            });
        })
        .catch(error => {
            console.error("Error loading or processing data:", error);
        });
}

function getSectionInfo(jsonFile) {
    const mapping = {
        '../data/anime.json': { sectionId: 'anime', className: 'anime' },
        '../data/movie.json': { sectionId: 'movie', className: 'movie' },
        '../data/music.json': { sectionId: 'music', className: 'music' },
        '../data/game.json': { sectionId: 'game', className: 'game' },
        '../data/channel.json': { sectionId: 'channel', className: 'channel' },
        '../data/books.json': { sectionId: 'books', className: 'books' },
        '../data/manga.json': { sectionId: 'manga', className: 'manga' },
        '../data/manhwa.json': { sectionId: 'manhwa', className: 'manhwa' },
        '../data/series.json': { sectionId: 'series', className: 'series' },
        '../data/animem.json': { sectionId: 'animem', className: 'animem' }
    };
    
    return mapping[jsonFile];
}
