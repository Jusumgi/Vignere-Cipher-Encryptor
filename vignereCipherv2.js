const prompt = require('prompt-sync')();
let order33_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890$,.?!";    // Using the same cipher length as DMA, changed out special characters to include all punctuation.
let housebool_string = "02468AzByCxDwEvFuGtHsIrJqKpLoM!,.$?nNmOlPkQjRiShTgUfVeWdXcYbZa13579 "; // Using our own cipher with sophisticated positioning and spacebar is included.
function vignereCipherEncrypt(plainText, key, cipher){
    let encryptedText = "";                                                                        // Establish an empty string for the iterated Encoded Text
    let keyPattern = [];                                                                         // Establish an empty array for the Key Pattern to be established.
    for (const char of key){
        if (cipher.includes(char)){                                                       // A character of the provided key is checked to see if it is found in cipher.
            keyPattern.push(cipher.indexOf(char))                                         // IF TRUE: Push the character's index # from cipher into keyPattern array.
        } else {
            keyPattern.push(key.length)                                                        // IF FALSE: Push the key's length into keyPattern array.
        }
    }
    for(const char of plainText){
        let shiftCipher = cipher.split('');                                               // Break cipher into an array for manipulation.
        if (cipher.includes(char)){                                                       // A character of the provided message is checked to see if it is found in cipher.
                                                                                                 // IF TRUE: Encode the character.
            for(let i=0; i < keyPattern[0]; i++){                                                // Loop until i == the index of the current keyPattern.
                shiftCipher.push(shiftCipher.shift());                                           // Rotates the shiftCipher array to find the new character, by the integer of the first keyPattern element.
            }
            encryptedText += cipher[(shiftCipher.indexOf(char)) % cipher.length]     // Push the new character based on the shiftCipher index, using modulo to maintain wrap-around.
            keyPattern.push(keyPattern.shift())                                                  // Shifts the keyPattern for the next character in the message.
        } else {
                                                                                                 // IF FALSE: Push the character without any changes.
            encryptedText += char
        }
    }
    return encryptedText                                                                           // Return the complete Encoded Text.

}
function vignereCipherDecrypt(encryptedText, key, cipher){
    let decryptedText = "";
    let keyPattern = [];
    for (const char of key){
        if (cipher.includes(char)){
            keyPattern.push(cipher.indexOf(char))
        } else {
            keyPattern.push(key.length)
        }
    }
    for(const char of encryptedText){
        let shiftCipher = cipher.split('');
        if (cipher.includes(char)){
            decryptedText += cipher[(shiftCipher.indexOf(char)+keyPattern[0]+shiftCipher.length) % cipher.length] // To unshift the encrypted text, we need to add the full cipher-length to our decoding index, so that we land back where the original letter is.
            keyPattern.push(keyPattern.shift())
        } else {
            decryptedText += char
        }
    }
    return decryptedText

}

function mainMenu(){                                     // Intended to be the Main Menu of the program where the user can choose to Encode or Decode a message using a key.
    console.log("You've entered the House Bool encoder.");
    console.log("Enter 0 to Exit the encoder.")
    let cipher = prompt("House Bool Cipher[1] or Order of 33[2]? ")
    switch(cipher){
        case '1':
            cipher = housebool_string;
            console.log("Glory to House Bool!")
            break;
        case '2':
            cipher = order33_string;
            console.log("XG$h7IS1lQuKzMJ,")             // An easter egg for Order of 33.
            break;
        };
    let mode = prompt("Encode[1] or Decode[2]? ")        // Select a mode, if you do not select a valid option, the encoder will place you back at the Main Menu.
    switch(mode){
        case '1':
            console.log("Encoding..");
            let encMsg = prompt("Enter the plaintext message... ");
            let encKey = prompt("Enter a keyword or phrase... ");
            console.log(vignereCipherEncrypt(encMsg, encKey, cipher));
            break;
        case '2':
            console.log("Decoding..");
            let decMsg = prompt("Enter the encrypted message... ");
            let decKey = prompt("Enter a keyword or phrase... ");
            console.log(vignereCipherDecrypt(decMsg, decKey, cipher));
            break;
        case '0':
            console.log("Goodbye!");
            break;
        default:
            console.log("Please select an option..")
            mainMenu()

    };
};

mainMenu()
