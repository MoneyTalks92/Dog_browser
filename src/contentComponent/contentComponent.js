import '../css/contentComponent.css';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';

// az export default ide is beírható, akkor a file végére nem kell
export default class ContentComponent {
  // ha van már kép megjelenítve, akkor azt töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }

  // ez a metódus letölti az adatot az APIról
  async getImages(dogbreed) {
    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages függvény futását
      return;
    }
    let urlString = '';
    dogbreed = dogbreed.split(' ');
    // a dogbreed változó most már egy tömb!
    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0]}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1]}/${dogbreed[0]}/images`;
    }
    const response = await fetch(urlString.toLowerCase());
    const data = await response.json();
    // a data változó egy objectet tartalmazó tömb
    return data;
  }

  // ez a metódus megjelenít egy képet
  displayImage(data) {
    this.clearErrors();
    const image = document.createElement('img');
    image.classList.add('lazy');
    // a data.message tömbböl egy véletlenszerű elemet kiválasztunk
    image.src = preloading;
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName == 'IMG' && !event.target.classList.contains('lazy')) {
            event.target.classList.add('yall-loaded');
          }
        }
      }
    });
    console.log(data);
  }
  handleContentDisplay(searchTerm) {
    // az arrow functionnek nincs saját this kulcsszava, tehát az arrow function-ön belül a this ugyanazt fogja jelenteni mint azon kívül (a class-t amiben vagyunk)
    let count = parseInt(document.querySelector('#imageNumberInput').value);
    Math.floor(count);
    if (isNaN(count)) {
      count = 1;
    }
    this.clearContent();
    // mivel a getImages egy async method, ezért ez is promise-al tér vissza
    // emiatt a promise objecten, amit a getImages visszaad elérhető a .then() metódus
    // a then meótus bemeneti paramétere egy callback function, ami akkor fut le, amikor a promise beteljesül (akkor jön létre a data amit visszaad a getImages metódus)
    // ha az arrow functionbe csak egy bemeneti paraméter van, akkor a zárójel elhagyható
    this.getImages(searchTerm).then((result) => {
      // ha csak egy dolgot kell csinálni az if blokkban, akkor a kódblokk {} elhagyható
      if (result) this.displayImage(result);
    });
  }
  setSearchTerm(term) {
    document.querySelector('#dogSearchInput').value = term;
  }
}