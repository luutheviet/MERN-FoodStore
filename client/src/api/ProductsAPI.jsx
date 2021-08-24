import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductsAPI() {
    const [products,setProducts]=useState([])
    const [callBack,setCallBack]=useState(false)
    const [category,setCategory]=useState('')
    const [sort,setSort]=useState('')
    const [search,setSearch]=useState('')
    const [page,setPage]=useState(1)
    const [result,setResult]=useState(0)


    useEffect(()=>{
        const getAllProducts=async ()=>{
            const res=await axios.get(`api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
        }
        getAllProducts()
    },[setProducts,callBack,category,sort,search,page])

    return {
        products:[products,setProducts],
        callback:[callBack,setCallBack],
        category:[category,setCategory],
        sort:[sort,setSort],
        search:[search,setSearch],
        page:[page,setPage],
        result:[result,setResult]
    };
}

export default ProductsAPI;