import View from './components/View.js';
import initialPage from './components/initialPage.js';
import isBtnSelected from './components/isBtnSelected.js';
import Field from './controllers/Field.js';

export default class GamePlay {


    initiate() {
        view.mount('root');
        
        const btn = document.getElementById('startGame');
        const handler = () => {
            const spreadType = isBtnSelected('inputAuto') ? 'auto' : 'handle';
            view.remove();
            this.spreadShips(spreadType);
            btn.removeEventListener('click', handler);

        };
        btn.addEventListener('click', handler);
        
        
        //create panel and handlers
        //onClick remove element, eventListener and call spreadShips(spreadType)

    }

    spreadShips(spreadType) {
        console.log('ships spread method is', spreadType)
        field.build()
        
        // create user field and panel with ship buttons
        // create button "start game"
        // deppending on spreadType call autoLocating or handleLocating
        // after "start game" remove buttons panel and "start game" buttons,
        // create comp field, call autoLocating for comp,
        // call startGame
    }

    startGame() {
        // set eventListener "game()" on copm field,
    }

    // ship attribute:
    // class : "empty" "ship"
    // name : "sd1" "sd2"... "sd4" "dd1"...  "td1"... "fd"
    // state : "shoted" "unshoted" "injured" "killed"

    game() {
        // chech event target class "shoted" or "unshoted"
        // if "shoted" return
        // if "unshoted"
        // check event target has attribute "empty" "ship" "injured" "name" "deckNumber"
        // if "empty" set attr "shoted" return
        // if "ship" 
        // set fleet.ship(name) 
        //set attr "shoted"

        // if "ship" && "injured" check "name"

    }

    endGame() {

    }
}
