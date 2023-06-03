import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
    const [cards, setCards] = useState(null);
    const [foundText, setFoundText] = useState("");
    useEffect(() => {
        setCards(document.querySelector(".data").children[1].children[1].children);
    })
    function search() {
        const inputValue = document.querySelector("#search").value.toLowerCase();
        
        for(let i = 0; i < cards.length; i++) {
            cards[i].style.display = "flex";
        }
                
        let nothingFound = true;
        for(let i = 0; i < cards.length; i++) {
            if(!cards[i].children[4].innerText.toLowerCase().includes(inputValue)) {
                cards[i].style.display ="none";
            } else {
                nothingFound = false;
            }
        }

        if(nothingFound) {
            for(let i = 0; i < cards.length; i++) {
                cards[i].style.display = "flex";
            }
            setFoundText("Nothing found");
        } else {
            setFoundText("We found somthing");
        }

    }
    return (
        <section className="dataHeader">
            <form className="formData" onSubmit={(e) => {
                        e.preventDefault();
                        search();
                    }}>
                    <div className="inputContainer">
                        <label htmlFor="search">Search for item</label>
                        <input id="search" type="text" placeholder="Enter here" />
                    </div>
                    <button><p>Search</p></button>
                </form>
            <p style={{ marginTop: "10px"}}>{foundText}</p>
        </section>
    )
}


export default Header;