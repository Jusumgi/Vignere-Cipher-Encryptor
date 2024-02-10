const prompt = require('prompt-sync')();
function vignereCipherEncoder(plainText, key){
    let cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$?!";    // Using the same cipher length as DMA
    // let cipher_string = "02468AzByCxDwEvFuGtHsIrJqKpLoM!@$_nNmOlPkQjRiShTgUfVeWdXcYbZa13579"; // Using our own cipher
    let encodedText = "";                                                                        // Establish an empty string for the iterated Encoded Text
    let keyPattern = [];                                                                         // Establish an empty array for the Key Pattern to be established.
    for (const char of key){
        if (cipher_string.includes(char)){                                                       // A character of the provided key is checked to see if it is found in cipher_string.
            keyPattern.push(cipher_string.indexOf(char))                                         // IF TRUE: Push the character's index # from cipher_string into keyPattern array.
        } else {
            keyPattern.push(key.length)                                                        // IF FALSE: Push the key's length into keyPattern array.
        }
    }
    for(const char of plainText){
        let shiftCipher = cipher_string.split('');                                               // Break cipher_string into an array for manipulation.
        if (cipher_string.includes(char)){                                                       // A character of the provided message is checked to see if it is found in cipher_string.
                                                                                                 // IF TRUE: Encode the character.
            for(let i=0; i < keyPattern[0]; i++){                                                // Loop until i == the index of the current keyPattern.
                shiftCipher.push(shiftCipher.shift());                                           // Rotates the shiftCipher array to find the new character, by the integer of the first keyPattern element.
            }
            encodedText += cipher_string[(shiftCipher.indexOf(char)) % cipher_string.length]     // Push the new character based on the shiftCipher index, using modulo to maintain wrap-around.
            keyPattern.push(keyPattern.shift())                                                  // Shifts the keyPattern for the next character in the message.
        } else {
                                                                                                 // IF FALSE: Push the character without any changes.
            encodedText += char
        }
    }
    return encodedText                                                                           // Return the complete Encoded Text.

}
function vignereCipherDecoder(encryptedText, key){
    let cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$?!";
    let decodedText = "";
    let keyPattern = [];
    for (const char of key){
        if (cipher_string.includes(char)){
            keyPattern.push(cipher_string.indexOf(char))
        } else {
            keyPattern.push(key.length)
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

function mainMenu(){       // Intended to be the Main Menu of the program where the user can choose to Encode or Decode a message using a key.
    console.log("You've entered the House Bool encoder.");
    let mode = prompt("Encode[1] or Decode[2]?")
    switch(mode){
        case '1':
            let encMsg = prompt("Enter a message...");
            let encKey = prompt("Enter a keyword or phrase...");
            console.log("Encoding..");
            console.log(vignereCipherEncoder(encMsg, encKey));
            break;
        case '2':
            let decMsg = prompt("Enter a message...");
            let decKey = prompt("Enter a keyword or phrase...");
            console.log("Encoding..");
            console.log(vignereCipherDecoder(decMsg, decKey));
            break;
        default:
            console.log("Please select an option..")
            mainMenu()

    }
}
// console.log("Encoded with Boolean key: " + vignereCipherEncoder("Fear the House of Bool!", "Boolean"))
// console.log("Decoded with \"Boolean\" key: " + vignereCipherDecoder(vignereCipherEncoder("Fear the House of Bool!", "Boolean"), "Boolean"))
// console.log("Decoded with \"Binary\" key: " + vignereCipherDecoder(vignereCipherEncoder("Fear the House of Bool!", "Boolean"), "Binary"))

mainMenu()
