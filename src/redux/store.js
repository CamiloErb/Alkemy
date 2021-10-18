import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../components/HeroeSearch/searchSlice"
import teamReducer from "../components/MyTeam/teamSlice"

export default configureStore({
    reducer: {
        search: searchReducer,
        team: teamReducer
    }
})