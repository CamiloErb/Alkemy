import axios from "axios";


export const getSuperHeroes = async (key) => {
    const apiURL = `https://www.superheroapi.com/api.php/10216562552770816/search/${key}`
     try {
        const response = await axios.get(apiURL)
        const heroes = response.data.results
        return heroes
    } catch(error)  {
        console.log(error)
    }
}