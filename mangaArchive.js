class Comic {
    static comicCount = 0;

    constructor(title, author) {
        this.title = title;
        this.author = author;
        Comic.comicCount++;
    }

    getInfo() {
        return `${this.title} by ${this.author}`;
    }
}

class Manga extends Comic {
    constructor(title, author, studio, chapter) {
        super(title, author);
        this.studio = studio;
        this.chapter = chapter;
    }

    getInfo() {
        return `${this.title} - ${this.studio} (Ch: ${this.chapter})`;
    }
}

class GraphicNovel extends Comic {
    constructor(title, author, genre) {
        super(title, author);
        this.genre = genre;
    }

    getInfo() {
        return `${this.title} by ${this.author} (${this.genre})`;
    }
}

// Derived Class 3: Western Comic
class WesternComic extends Comic {
    constructor(title, author, universe) {
        super(title, author);
        this.universe = universe;
    }

    getInfo() {
        return `${this.title} (${this.universe} Universe)`;
    }
}


const ArchiveApp = {
    mangas: [],
    novels: [],
    westerns: [],

    init() {
        this.addManga(new Manga("Naruto", "Masashi Kishimoto", "Studio Pierrot", 700));
        this.addManga(new Manga("One Piece", "Eiichiro Oda", "Toei Animation", 1050));
        this.addManga(new Manga("Attack on Titan", "Hajime Isayama", "Wit Studio", 139));
        this.addManga(new Manga("Death Note", "Tsugumi Ohba", "Madhouse", 108));
        
        this.addNovel(new GraphicNovel("Watchmen", "Alan Moore", "Superhero"));
        this.addNovel(new GraphicNovel("Maus", "Art Spiegelman", "Biography"));
        this.addNovel(new GraphicNovel("Persepolis", "Marjane Satrapi", "Autobiography"));
        this.addNovel(new GraphicNovel("V for Vendetta", "Alan Moore", "Dystopian"));

        this.addWestern(new WesternComic("Spider-Man", "Stan Lee", "Marvel"));
        this.addWestern(new WesternComic("Batman", "Bob Kane", "DC"));
        this.addWestern(new WesternComic("Superman", "Jerry Siegel", "DC"));
        this.addWestern(new WesternComic("Wonder Woman", "William Moulton Marston", "DC"));

        this.setupEventListeners();
        this.updateUI();
    },

    addManga(item) { this.mangas.push(item); },
    addNovel(item) { this.novels.push(item); },
    addWestern(item) { this.westerns.push(item); },

    updateUI() {
        document.getElementById('comic-count').innerText = Comic.comicCount;

        this.renderList('manga-list', this.mangas);
        this.renderList('novel-list', this.novels);
        this.renderList('western-list', this.westerns);
    },

    renderList(elementId, dataArray) {
        const listElement = document.getElementById(elementId);
        listElement.innerHTML = '';
        
        dataArray.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.getInfo();
            listElement.appendChild(li);
        });
    },

    setupEventListeners() {
        
        document.getElementById('add-btn').addEventListener('click', () => {
            const type = prompt("Enter Type:\n1. Manga\n2. Graphic Novel\n3. Western Comic");
            
            if (type === '1') {
                const title = prompt("Enter Title:");
                const author = prompt("Enter Author:");
                const studio = prompt("Enter Studio:");
                const chapter = prompt("Enter Chapter Number:");
                this.addManga(new Manga(title, author, studio, chapter));
            } 
            else if (type === '2') {
                const title = prompt("Enter Title:");
                const author = prompt("Enter Author:");
                const genre = prompt("Enter Genre:");
                this.addNovel(new GraphicNovel(title, author, genre));
            } 
            else if (type === '3') {
                const title = prompt("Enter Title:");
                const author = prompt("Enter Author:");
                const universe = prompt("Enter Universe (Marvel/DC):");
                this.addWestern(new WesternComic(title, author, universe));
            } 
            else {
                alert("Invalid Choice!");
            }
            this.updateUI();
        });

        document.getElementById('search-btn').addEventListener('click', () => {
            const query = document.getElementById('search-input').value.toLowerCase();
            const allItems = [...this.mangas, ...this.novels, ...this.westerns];
            
            const found = allItems.find(item => item.title.toLowerCase() === query);
            
            if (found) {
                alert(
                    "✨ ITEM FOUND IN ARCHIVE ✨\n" +
                    "----------------------------\n" + 
                    found.getInfo() + 
                    "\n----------------------------"
                );
            } else {
                alert("❌ Item not found in archive.");
            }
        });

        document.getElementById('search-input').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('search-btn').click();
            }
        });

        document.getElementById('edit-btn').addEventListener('click', () => {
            const titleToFind = prompt("Enter the title of the item to edit:");
            
            let foundItem = null;
            let currentList = null;
            let categoryType = "";

            if (this.mangas.find(i => i.title === titleToFind)) {
                foundItem = this.mangas.find(i => i.title === titleToFind);
                currentList = this.mangas;
                categoryType = "Manga";
            } 
            else if (this.novels.find(i => i.title === titleToFind)) {
                foundItem = this.novels.find(i => i.title === titleToFind);
                currentList = this.novels;
                categoryType = "Graphic Novel";
            } 
            else if (this.westerns.find(i => i.title === titleToFind)) {
                foundItem = this.westerns.find(i => i.title === titleToFind);
                currentList = this.westerns;
                categoryType = "Western Comic";
            }

            if (!foundItem) {
                alert("Item not found!");
                return;
            }

            const choice = prompt(
                `Found: ${foundItem.title} (${categoryType})\n\n` +
                `What would you like to do?\n` +
                `1. Edit Details (Keep as ${categoryType})\n` +
                `2. Change Category (Convert to something else)`
            );

            if (choice === '1') {
                foundItem.title = prompt("Edit Title:", foundItem.title);
                foundItem.author = prompt("Edit Author:", foundItem.author);

                if (categoryType === "Manga") {
                    foundItem.studio = prompt("Edit Studio:", foundItem.studio);
                    foundItem.chapter = prompt("Edit Chapter:", foundItem.chapter);
                } 
                else if (categoryType === "Graphic Novel") {
                    foundItem.genre = prompt("Edit Genre:", foundItem.genre);
                } 
                else if (categoryType === "Western Comic") {
                    foundItem.universe = prompt("Edit Universe:", foundItem.universe);
                }
                
                alert("Details updated successfully!");
                this.updateUI();
            }

            else if (choice === '2') {
                const index = currentList.indexOf(foundItem);
                currentList.splice(index, 1); 
                Comic.comicCount--;

                const newType = prompt("Select New Category:\n1. Manga\n2. Graphic Novel\n3. Western Comic");

                const newTitle = prompt("Enter Title:", foundItem.title);
                const newAuthor = prompt("Enter Author:", foundItem.author);

                if (newType === '1') {
                    const studio = prompt("Enter Studio:");
                    const chapter = prompt("Enter Chapter:");
                    this.addManga(new Manga(newTitle, newAuthor, studio, chapter));
                } 
                else if (newType === '2') {
                    const genre = prompt("Enter Genre:");
                    this.addNovel(new GraphicNovel(newTitle, newAuthor, genre));
                } 
                else if (newType === '3') {
                    const universe = prompt("Enter Universe:");
                    this.addWestern(new WesternComic(newTitle, newAuthor, universe));
                } 
                else {
                    alert("Invalid Category Selection. Action cancelled (Item deleted).");
                }

                alert("Category changed and item updated!");
                this.updateUI();
            }
        });

        document.getElementById('save-btn').addEventListener('click', () => {
            let content = "***** USER ARCHIVE *****\n\n";
            
            content += "--- Manga ---\n";
            this.mangas.forEach(m => content += m.getInfo() + "\n");
            
            content += "\n--- Graphic Novels ---\n";
            this.novels.forEach(n => content += n.getInfo() + "\n");
            
            content += "\n--- Western Comics ---\n";
            this.westerns.forEach(w => content += w.getInfo() + "\n");

            content += `\nTotal Items: ${Comic.comicCount}`;

            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'my_archive.txt';
            link.click();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ArchiveApp.init();
});