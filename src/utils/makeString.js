module.exports = function (size) {
    let rv = "",chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    for(let i=0;i<size;i++)
        rv+=chars[Math.floor(Math.random() * 52)]
    return encodeURIComponent(rv);
}