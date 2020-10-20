function attrToCoord(attr) {
    const x = attr[0];
    const y = attr[1];
    return {x: +x, y: +y};
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
    attrToCoord,
    idToAttr
}