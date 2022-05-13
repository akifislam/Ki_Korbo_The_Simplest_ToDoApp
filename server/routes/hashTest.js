const PASSWORD = "a1k2i3f4@akif";
const bcrypt = require("bcrypt");
// Salt is a random string of characters that is used to make the hash more unique.
// Generating Salt for Encryption
bcrypt.genSalt(10).then((genereatedSalt) => {
  console.log("Salt : " + genereatedSalt); // Output : $2b$10$9KfZ12wTFGv0xFlmEOXTye
  // Hashing Password with Salt
  bcrypt.hash(PASSWORD, genereatedSalt).then((hashedPassword) => {
    console.log("Hashed Password is " + hashedPassword); //$2b$10$Y5oBqpKI366pp0MsbpMFpOaGkKcbPg3KkQdAmQ0IlQ6kH9Pxzgg0K
    // Comparing Password with Hashed Password
    bcrypt.compare(PASSWORD, hashedPassword).then((result) => {
      console.log("Result : " + result); // Output : true
    });
  });
});
