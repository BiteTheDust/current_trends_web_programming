console.log("----------------- Hello, World! Coins ------------------- \n")
let nonce = 1
const
    // For cryptographic functions (https://nodejs.org/api/crypto.html)
    crypto = require('crypto')

// Get a list of all supported hashing algorithms
const hashes = crypto.getHashes()

// Print the list to the console
//console.log(hashes)

const 
    // The hashing algorithm we will use
    hashingAlgorithm = 'sha256'

    // Create a new Hash object (Note: we do not use 'new')
 let   hash = crypto.createHash(hashingAlgorithm)

    // The message to be hashed
    let message = "Hello, World!" + nonce

// Update the data to be hashed
hash.update(message);

// Perform the hash
let digest = hash.digest('hex')

		
		while (digest.charAt(0) != '0' || digest.charAt(1) != '0' || digest.charAt(2) != '0') //&& digest.charAt(1) != '0' && digest.charAt(2) != '0')
		{
			nonce++
			hash = crypto.createHash(hashingAlgorithm),

	  	  	// The message to be hashed
	   	 	message = 'Hello, World!' + nonce
			// Update the data to be hashed
			hash.update(message);

			// Perform the hash
			digest = hash.digest('hex')
				if (digest.charAt(0) == '0' && digest.charAt(1) == '0' && digest.charAt(2) == '0')
				{

					console.log(`The '${hashingAlgorithm}' digest of '${message}' is: ${digest}`)
				}
				//console.log(message + " "+ digest) // Uncomment to check each 'Hello, World!#..'
		}

console.log("\n--------------- Message Validator ---------------- \n")

