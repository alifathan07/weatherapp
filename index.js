// EXPRESS APP . TYPE MODULE
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {render} from "ejs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// get apikey form env file 
const apiKey = process.env.API_KEY;

app.get("/", (req, res) => {
   
    res.render("index.ejs");
});
app.post("/", async(req, res) => {
    const { city } = req.body;
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {result: result});
    } catch (error) {
        res.render("index.ejs", {error: error});
    }
});
app.post("/geolocation", async (req, res) => {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).send("Latitude and longitude are required");
    }

    // Fetch weather data using latitude and longitude
    const apiKey = 'f85b758facc1c3bbff4b7e9bc8e7ecd4'; // Replace with your OpenWeatherMap API key
    try {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await axios.get(weatherApiUrl);
        const weatherData = response.data;
        res.render("index.ejs", {weatherData: weatherData});
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.render("index.ejs", {error: error});
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})