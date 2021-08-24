import axios from 'axios';
import { useEffect, useState } from 'react';

function ReviewsAPI() {
    const [reviews,setReviews]=useState([])
    const [callBack,setCallBack]=useState(false)

    useEffect(()=>{
        const getReviews=async ()=>{
            const res=await axios.get('/api/reviews')
            setReviews(res.data.reviews)
        }
        getReviews()
    },[callBack])
    return {
        reviews:[reviews,setReviews],
        callBack:[callBack,setCallBack]
    }
}

export default ReviewsAPI;