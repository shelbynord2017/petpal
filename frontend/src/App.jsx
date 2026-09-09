import { useState, useEffect } from "react";
import PetCard from "./PetCard.jsx";

const API = "http://localhost:3001/api";

export default function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPet() {
    setLoading(true);
    const res = await fetch(`${API}/pets`) //fetches pets from the backend
    const data = await res.json(); //stores them in state
    setLoading(false);
  } //we call this function once, when the component mounts using useEffect.

  useEffect(() => {
    loadPet();
  }, [])

  //next, create adopt and return pet functions.

  async function adopt(id){ //update the UI immediately, so the UI stays responsive. Then, send the corresponding req to the backend.
    setPets((prev) =>  //checks to see if the prev/current pet matches the id
      prev.map((p) => (p.id === id ? { ...p, adopted: true} : p)) //map through every pet. (p) represents one pet at a time. if the pet matches, then use the spread operator to copy everything from p, but set adopted: true(instead of false)
    );
    //this is important in React because you don't want to directly modify the existing state obj. Instead, you create a new obj.
    await fetch(`${API}/adopt/${id}`, {method: "POST"}); //send a POST req of the adopted pet id to this endpoint.
  } // await is important because it means start the req, and wait for the req to finish before continuing this function.
//without await, it would start the req, but your function wouldn't wait for it.

  async function returnPet(id){
    setPets((prev) =>
      prev.map((p) => (p.id === id ? {...p, adopted: false} : p))
  );
  await fetch(`${API}/return${id}`, { method: "DELETE"})
  }


return (
  <div style={{textAlign: "center", marginBottom: "20px" }}>
    <h1>PetPat Express</h1>

    <button onClick={loadPet} style={{padding: "10px 20px", marginBottom: "20px"}}>
      Refresh Pets
    </button>

    {loading && <p>Loading pets...</p>}
    <div style={{ 
          display: "flex", 
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",

        }}>
          {pets.map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              adopt={adopt} 
              returnPet={returnPet} 
            />
          ))}
        </div>
  </div>
)
}