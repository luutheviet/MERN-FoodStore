import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Product from './product/Product';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filter from './Filter';
import LoadMore from './LoadMore';

function Products() {
    const params=useParams()
    const state=useContext(GlobalState)
    const addCart=state.userAPI.addCart
    const [products]=state.productApi.products
    const [isAdmin]=state.userAPI.isAdmin
    const [token]=state.token
    const [callBack,setCallBack]=state.productApi.callback
    const [loading,setLoading]=useState(false)


    useEffect(()=>{
    },[products,params])


    const deleteProduct=async(public_id,id)=>{
        try {
            setLoading(true)
            const deleteImg=axios.post('/api/delete',{public_id},{
                headers:{Authorization:token}
            })
            const deleProduct=axios.delete(`/api/products/${id}`,{
                headers:{Authorization:token}
            })
            await deleteImg
            await deleProduct
            setLoading(false)
            setCallBack(!callBack)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <>
            
            <div className="product-container-wrap" style={{paddingBottom:80,marginTop:40}}>
                <div className="product-container container">
                    <Filter />
                    <div className="row">
                        {
                            products.map((pro)=>{
                                    return(
                                        <Product key={pro._id} product={pro} token={token} 
                                        callBack={callBack} setCallBack={setCallBack} isAdmin={isAdmin}
                                        deleteProduct={deleteProduct}
                                        loading={loading}
                                        addCart={addCart} />
                                    )
                            })
                        }
                    </div>
                </div>
                <LoadMore />
            </div>
            {products.length===0&&<Loading/>}
        </>
    );
}

export default Products;