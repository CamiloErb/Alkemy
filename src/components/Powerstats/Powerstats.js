import { useEffect, useState } from "react"

export const Powerstats = (props) => {
    const stats = ["intelligence" , "strength", "speed", "durability",  "power", "combat"]
    const powerstats = props.list? props.list.map(heroe => heroe.powerstats) : []

    const [keys, setKeys] = useState([])

    const getPowerstatValue = (stat) => {
        const powerstatsNumber = powerstats.map(powerstat => parseInt(powerstat[stat]))
        return {[stat] : powerstatsNumber.reduce((a, b) => a + b, 0)}
        }
    
    useEffect(()=>{
        const newArr = stats.map(key => getPowerstatValue(key))
        setKeys(newArr.sort(compare))

    },[props.list])

    const compare = (a, b) => {
        return  Object.values(b) - Object.values(a) 
    }


    return <div className="list-group">
        {keys.map(key =>
            <div key={Object.keys(key)} className="m-2 list-group-item "><h5 >{Object.keys(key)}:</h5> <h5 className="text-secondary">{Object.values(key)}</h5></div>)}
    </div>
}