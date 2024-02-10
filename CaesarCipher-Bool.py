
# Caesar Cipher Created Using ROT13 (66 chars long with a rotation of 33, because Freemasons)
# Encoding a Message to CISCO: "Dearest CISCO members! THIS IS A DECLARATION OF WAR! Hahahahah! Please don't hack us! SINCERELY! DMA"
# Author: Mr. Olin

def caesar_cipher(text): # Define a function that takes a string as an argument
    cipher_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$_!" # Define a string for rotation
    #cipher_string = "02468AzByCxDwEvFuGtHsIrJqKpLoM!@$ nNmOlPkQjRiShTgUfVeWdXcYbZa13579" # Define a string for rotation
    shifted_text = "" # Create a blank string to house the rotated text based on index position and modulus division
    shift_amount = 33 # Create a shift amount (ROT13, means the cipher can encode and decode all in one, less secure)
    for char in text: # For loop to iterate through each character in the text argument (Use For when the amount if known)
        if char in cipher_string: # Only encoding characters in the string we defined. Others skipped.
            shifted_text += cipher_string[(cipher_string.index(char) + shift_amount) % len(cipher_string)]
            # Rotates text. Ex @ = index position 62. (62 + 33 = 95) Then modulus division: (95 % 66 = 29 for new index position)
            # If new index position is less than 66, it returns the full value as the remainder (54 % 66 = 54)
        else:
            shifted_text += char
            # Appends a char to the shifted text string if it is not in the cipher_string variable
    return shifted_text # Returns our outputs our endoded message.

# Example usage:
plaintext = input("Type in a message to be encrypted.\n") # Instructions to user with newline break for formatting
encrypted_text = caesar_cipher(plaintext) # Calls the function with the user input
f = open("bool2.txt", "a")
f.write(encrypted_text) #" Outputs an encoded string to the terminal / console
f.close()

    
