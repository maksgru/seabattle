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
            orientation: 'verticalHeadUp',
            coordinates: [`${position}`, `${+position + 1}`, `${+position + 2}`]
        }
    
    }
}