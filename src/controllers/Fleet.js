export default class Fleet {

    sinleDeckShip = (position) => {
        return {
            name: 'singleDeck1',
            coordinates: [`${position}`]
        }
    }

    trippleDeckShip = (position) => {
        return {
            name: 'trippleDeck1',
            orientation: 'vertical',
            coordinates: [`${position}`, `${+position + 1}`, `${+position + 2}`]
        }
    
    }
}