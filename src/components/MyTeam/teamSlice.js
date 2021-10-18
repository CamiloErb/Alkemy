import { createSlice } from "@reduxjs/toolkit";


const teamSlice = createSlice({
    name: "team",
    initialState: {
        myTeam: []
    },
    reducers: {
        addHero: (state, {payload}) => {
            state.myTeam = [...state.myTeam, payload]
        },
        removeHero: (state, {payload}) => {
            state.myTeam = state.myTeam.filter(heroe => heroe.id != payload)
        }
    }
})

export const {addHero, removeHero} = teamSlice.actions

export default teamSlice.reducer
