const prompt = require('prompt-sync')();
let cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$,.?!";    // Using the same cipher length as DMA, changed out special characters to include all punctuation.
// let cipher_string = "02468AzByCxDwEvFuGtHsIrJqKpLoM!,.$?nNmOlPkQjRiShTgUfVeWdXcYbZa13579 "; // Using our own cipher with sophisticated positioning and spacebar is included.
function vignereCipherEncoder(plainText, key){
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
            decodedText += cipher_string[(shiftCipher.indexOf(char)+keyPattern[0]+shiftCipher.length) % cipher_string.length] // To unshift the encrypted text, we need to add the full cipher-length to our decoding index, so that we land back where the original letter is.
            keyPattern.push(keyPattern.shift())
        } else {
            decodedText += char
        }
    }
    return decodedText

}

function mainMenu(){                                     // Intended to be the Main Menu of the program where the user can choose to Encode or Decode a message using a key.
    console.log("You've entered the House Bool encoder.");
    console.log("Enter 0 to Exit the encoder.")
    let mode = prompt("Encode[1] or Decode[2]?")        // Select a mode, if you do not select a valid option, the encoder will place you back at the Main Menu.
    switch(mode){
        case '1':
            console.log("Encoding..");
            let encMsg = prompt("Enter the plaintext message...");
            let encKey = prompt("Enter a keyword or phrase...");
            console.log(vignereCipherEncoder(encMsg, encKey));
            break;
        case '2':
            console.log("Decoding..");
            let decMsg = prompt("Enter the encrypted message...");
            let decKey = prompt("Enter a keyword or phrase...");
            console.log(vignereCipherDecoder(decMsg, decKey));
            break;
        case '0':
            console.log("Goodbye!");
            break;
        default:
            console.log("Please select an option..")
            mainMenu()

    }
}

mainMenu()
