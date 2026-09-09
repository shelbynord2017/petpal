export default function PetCard({pet, adopt, returnPet}){
    return (
        <div 
            style={{
                width: 220, 
                height: 330, 
                padding: 12, 
                border: "1px solid #ccc",
                borderRadius: 10,
                background: pet.adopted ? "#d4f8d4" : "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <img 
                src={pet.image} 
                alt={pet.type} 
                style={{
                    width: "100%", 
                    height: 150, 
                    objectFit: "cover", 
                    borderRadius: 8,
                }}
            />
            <div>
                <h3 style={{ margin: "10px 0"}}>{pet.name}</h3>
                <p style={{ margin: 0}}>
                    {pet.type} - {pet.trait}
                </p>
            </div>

            {!pet.adopted ? (
                <button 
                    onClick={() => adopt(pet.id)} 
                    style={{
                        padding: "8px 12px", 
                        background: "#6ab84c", 
                        color: "white", 
                        border: "none", 
                        borderRadius: 5, 
                        cursor: "pointer", 
                        marginTop: 10
                    }}
                >
                    Adopt
                </button>
            ) : (
                <>
                    <p style={{ color: "green", fontWeight: "bold" }}>Adopted!</p>
                    <button 
                        onClick={() => returnPet(pet.id)} 
                        style={{
                            padding: "6px 10px", 
                            background: "#eb4d4b", 
                            color: "white", 
                            border: "none", 
                            borderRadius: 5, 
                            cursor: "pointer"
                        }}
                    >
                        Return 
                    </button>
                </>
            )
        }
        </div>
    )
}