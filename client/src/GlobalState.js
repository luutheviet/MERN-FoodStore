import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import ReviewsAPI from "./api/ReviewsAPI";

export const GlobalState=createContext()

export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)

    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                const res=await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken)

                setTimeout(()=>{
                    refreshToken()
                },10*60*1000)
            }
            refreshToken()
        }
    },[])
    const state={
        token:[token,setToken],
        productApi:ProductsAPI(),
        userAPI:UserAPI(token),
        categoriesAPI:CategoriesAPI(),
        reviewsAPI:ReviewsAPI()
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}