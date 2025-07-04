const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config(); // ✅ this loads .env variables into process.env


// Set view engine to EJS
app.set('view engine', 'ejs');

// Set public folder for static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



const api = process.env.NASA_API_KEY
const url=`https://api.nasa.gov/planetary/apod?api_key=${api}`

// Home route
app.get('/', (req, res) => {
  res.render('index');
});
app.post("/info", async(req,res)=>{
    let {date}= req.body;
    try{
        let response = await fetch(`${url}&date=${date}`);
        let data = await response.json();
        console.log(data);
        
        res.render("show",{data})
    }
    catch(err){
        console.error("Error fetching data from NASA API:", err);
        res.status(500).send("Internal Server Error");
    }

})
// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
