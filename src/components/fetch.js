import React from "react"

let apikey = '7c321818f6b1d697bb53281bfcedef68';
let hashkey = 'ad164c933ea6e6d88cda41dd9ba5d468';
let marvelComicsUrl = `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=${apikey}&hash=${hashkey}`


async function Fetch(){
    let raw_data = await fetch(marvelComicsUrl);
    let data = await raw_data.json();
    return (
        <div className="fetch">
        <div className="card">
            {/* {data} */}
        </div>
        </div>
        
        )
}

export default Fetch;