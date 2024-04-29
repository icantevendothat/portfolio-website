let express = require("express");
let app = express();

// app.get('/', (req,res)=> {
//     res.send("My Portfolio");
// })

app.listen(3000, ()=> {
    console.log("listening on 3000");
})

// app.get('/about', (req,res)=> {
//     res.send("About Me");
// })

// app.get('/projects', (req,res)=> {
//     res.send("My Projects");
// })

app.use('/', express.static ('public', { 'extensions': ['css'] }));