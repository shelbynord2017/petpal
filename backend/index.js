import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

async function dogPic(){ //function is to fetch data, nothing else
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json(); // convert data to json
    return data.message; //fetch URL
}

async function catPic(){ //function is to fetch data, nothing else
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json(); // convert data to json
    return data[0].url; //adjust URL so it pulls out the url the api returns
}

async function makePet(id){ //creates a single pet obj
    const names = ["Luna", "Max", "Bella", "Milo", "Coco"];
    const types = ["Cat", "Dog", "Rabbit"];
    const traits = ["Playful", "Shy", "Curious", "Lazy"];

    const type = types[Math.floor(Math.random() * types.length)];

    let image;
    if(type === "Dog") image = await dogPic();
    else if (type === "Cat") image - await catPic();
    else image = "https://random.imagecdn.app/200/200";

    return {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        type,
        trait: traits[Math.floor(Math.random() * traits.length)],
        image,
        adopted: false
    };
}

app.get("/api/pets", async (req, res)=> { //we make free pets calling makePet() with different id's
    const pets = [await makePet(1), await makePet(2), await makePet(3), await makePet(4)];
    res.json(pets);
}); //first real API endpoint

//make post route for adopting, and delete route for returning.

app.post("/api/adopt/:id", (req, res) => res.json({ message: "Adopted:" }))
app.delete("/api/return/:id", (req, res) => res.json({ message: "Returned:" }))

//now that the routes are made, test them with Postman.
//test the api route in postman: http://localhost:3000/api/pets--should get 

app.listen(PORT, () => {
    console.log(`Working PetPal API at http://localhost:${PORT}`)
})

