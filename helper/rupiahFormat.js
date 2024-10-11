function rupiahFormat(value) {
    let result = value.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
    
    return result
}

module.exports = rupiahFormat