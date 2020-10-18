function coordinatesToId(coordinates) {

return `${coordinates.x},${coordinates.y}`
}

function idToAttr(id) {
    const idx = id < 10 ? `0${id}` : `${id}`;
    return idx[1] + idx[0];
}
function normalizeCoordinates(coordinates) {
    return coordinates.length == 1 ? `0${coordinates}` : `${coordinates}`;
}

export {
    normalizeCoordinates,
    coordinatesToId,
    idToAttr
}