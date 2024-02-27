
// Caesar Cipher created in JavaScript 5 from Mr. Olin's Python script
// Created by Mr. Scouten and CISCO student Tyson Comfort
// Mr. Olin, if you are reading this, you're the GOAT. Also, say hi to Morgan Adams for me. She is family to me. 
// Oh, and just know, I almost joined your class. 

// Declaring message: "Dearest CISCO members! THIS IS A DECLARATION OF WAR! Hahahahah! Please don t hack us! SINCERELY! DMA"
// Original cipher alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_! (66 characters)

let finalText = ""; // Initialize the final decoded/encoded message here.

function Main(message, alphabet, shift) { // Main function for the encoder. Input the message to be encoded/deciphered, the alphabet needed to decipher, and your chosen shift.
// Note that several comments exist of former code. Please ignore.
    const alphabetInput = alphabet.split("") // Splits the argument alphabet into individual characters of its own array.
    let messageInput = message.split("") // Same as above, but for the input message.
    console.log(messageInput) // Testing to see if the messageInput acts as it should.
    console.log(shift) // Prints the shift number.
    for (let char = 0; char < messageInput.length; char++) { // For every character of the length of the message, it will do the following:
        if (alphabetInput.includes(messageInput[char]) == true) { // Checks to see if the character exists in the provided alphabetInput.
            finalText += alphabetInput[(alphabetInput.indexOf(messageInput[char])+ shift) % alphabetInput.length]
            // The cipher itself: Grabs the position of the message character within the provided alphabet, then adds the shift
            // Afterwards, if the new position of the character exceeds the total length of the inputted alphabet, a modulus calculation
            // is performed, which essentially acts as a wrap-around. Pac-man effect!
            console.log(finalText) // Well, if you cannot show the final deciphered/ciphered text, then WHAT HAS THIS ALL BEEN FOR?
        } else {
            finalText += " " // If the previously mentioned check fails, frick you, have a space. 
        }
    } 
}

// User input.
Main("If you seek to find the creator of this website, look no further than the relative of Morgan Adams. With love, TC", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_!", 33)
Main("p_ RHN L$$D MH _BG@ MA$ 0K$8MHK H_ MABL P$9LBM$  EHHD GH _NKMA$K MA8G MA$ K$E8MBO$ H_ tHK!8G h@8FL  4BMA EHO$  1j", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_!", 33)