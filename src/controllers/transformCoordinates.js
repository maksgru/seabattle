function coordinatesToId(coordinates) {

return `${coordinates.x},${coordinates.y}`
}

function idToAttr(id) {
    const idx = id < 10 ? `0${id}` : `${id}`
    return `${idx[1]}${idx[0]}`;
}

export default {
    coordinatesToId,
    idToAttr
}