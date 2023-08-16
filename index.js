// const bcrypt = require('bcrypt');

// const hashPassword = async(pw)=>{
//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(pw, salt)
//     console.log(salt)
//     console.log(hash)
// }

// // hashPassword('Augustine');

// const login = async(pw, hashedPw)=>{
//     const result = await bcrypt.compare(pw, hashedPw);
//     if (result){
//         console.log('Logged in successfully')
//     }else{
//         console.log('Incorrect password')
//     }
// }

// login('Augustine', '$2b$10$f3iVGph6hhlmFUcmM41Yzuf.BCqep2niZ2JrcYctB/1sWZ8.0vIYu')