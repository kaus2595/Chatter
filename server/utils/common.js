
//TODO : This all will go in .env
const IV_LENGTH = 16; // For AES, this is always 16
const ENCRYPTION_KEY = "b494515b7e27a911bab48c4c6052709f"; // Must be 256 bits (32 characters)
const ENCRYPTION_TYPE = "aes-256-cbc"
const crypto = require("crypto");

module.exports = {

	encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv(ENCRYPTION_TYPE, Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    },
    
    decrypt(text) {
        let textParts = text.split(":");
        let iv = Buffer.from(textParts.shift(), "hex");
        let encryptedText = Buffer.from(textParts.join(":"), "hex");
        let decipher = crypto.createDecipheriv(ENCRYPTION_TYPE, Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
};