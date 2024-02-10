function mainMenu(){

}
function vignereCipherEncoder(plainText, key){
    let cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_!";
    // let cipher_string = "02468AzByCxDwEvFuGtHsIrJqKpLoM!@$_nNmOlPkQjRiShTgUfVeWdXcYbZa13579";
    let encodedText = "";
    let keyPattern = [];
    for (const char of key){
        if (cipher_string.includes(char)){
            keyPattern.push(cipher_string.indexOf(char))
        } else {
            keyPattern.push(key.length())
        }
    }
    for(const char of plainText){
        let shiftCipher = cipher_string.split('');
        if (cipher_string.includes(char)){
            for(let i=0; i < keyPattern[0]; i++){
                shiftCipher.push(shiftCipher.shift());
            }
            encodedText += cipher_string[(shiftCipher.indexOf(char)) % cipher_string.length]
            keyPattern.push(keyPattern.shift())
        } else {
            encodedText += char
        }
    }
    return encodedText

}
function vignereCipherDecoder(encryptedText, key){
    let cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_!";
    let decodedText = "";
    let keyPattern = [];
    for (const char of key){
        if (cipher_string.includes(char)){
            keyPattern.push(cipher_string.indexOf(char))
        } else {
            keyPattern.push(key.length())
        }
    }
    for(const char of encryptedText){
        let shiftCipher = cipher_string.split('');
        if (cipher_string.includes(char)){
            decodedText += cipher_string[(shiftCipher.indexOf(char)+keyPattern[0]+shiftCipher.length) % cipher_string.length]
            keyPattern.push(keyPattern.shift())
        } else {
            decodedText += char
        }
    }
    return decodedText

}
console.log("Encoded with Boolean key: " + vignereCipherEncoder("Fear the House of Bool!", "Boolean"))
console.log("Decoded with \"Boolean\" key: " + vignereCipherDecoder(vignereCipherEncoder("Fear the House of Bool!", "Boolean"), "Boolean"))
console.log("Decoded with \"Binary\" key: " + vignereCipherDecoder(vignereCipherEncoder("Fear the House of Bool!", "Boolean"), "Binary"))

