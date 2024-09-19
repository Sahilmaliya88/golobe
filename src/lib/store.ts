import { configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import loaderSlice from "./slices/loaderSlice";
export const store = configureStore({
    reducer:{
        auth:AuthSlice,
        loader:loaderSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type Dipatch = typeof store.dispatch