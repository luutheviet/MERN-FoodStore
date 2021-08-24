import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const initialState={
    product_id:'',
    title:'',
    price:0,
    description:'',
    content:'Siêu Ngon',
    category:'',
    _id:''
}

function CreateProduct() {
    const state=useContext(GlobalState)
    const [product,setProduct]=useState(initialState)
    const [categories]=state.categoriesAPI.categories
    const [images,setImages]=useState(false)
    const [loading,setLoading]=useState(false)
    const [products]=state.productApi.products
    const [onEdit,setOnEdit]=useState(false)

    const history=useHistory()
    const params=useParams()

    const [isAdmin]=state.userAPI.isAdmin
    const [token]=state.token
    const [callBack,setCallBack]=state.productApi.callback

    useEffect(()=>{
        if(params.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id===params.id){
                    setProduct(product)
                    setImages(product.images)
                }
            });
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[params.id,products])

    const handleUpLoad=async(e)=>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Bạn không phải là admin")
            const file=e.target.files[0]
            if(!file) return alert("File không tồn tại")
            if(file.type!=='image/jpeg'&&file.type!=='image/png') return alert("File không đúng định dạng")
            let formData=new FormData()
            formData.append('file',file)

            setLoading(true)
            const res=await axios.post('/api/upload',formData,{
                headers:{'content-type':'multipart/form-data',Authorization:token}
            })
            setLoading(false)
            setImages(res.data)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleDelete=async()=>{
        try {
            if(!isAdmin) return alert("Bạn không phải là admin")
            setLoading(true)
            await axios.post('/api/delete',{public_id:images.public_id},{
                headers:{Authorization:token}
            })
            setLoading(false)
            setImages(false)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const handleChangeInput=e=>{
        const {name,value}=e.target
        setProduct({...product,[name]:value})
    }

    const handleSubmit=async e=>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Bạn không phải là admin")
            if(!images) return alert("Bạn chưa chọn ảnh")
            if(onEdit){
                await axios.put(`/api/products/${product._id}`,{...product,images},{
                    headers:{Authorization:token}
                })
            }else{
                await axios.post('/api/products',{...product,images},{
                    headers:{Authorization:token}
                })
            }
            
            setCallBack(!callBack)
            history.push('/')
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const styleUpload={
        display:images?"block":"none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" id="file_up" name="file" onChange={handleUpLoad} />
                {
                    loading?<div id="file_img"><Loading /></div>:
                        <div id="file_img" style={styleUpload}>
                            <img src={images?images.url:''} alt="" />
                            <span onClick={handleDelete}>X</span>
                        </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row-1">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row-1">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row-1">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row-1">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} onChange={handleChangeInput} rows="5"/>
                </div>

                <div className="row-1">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} onChange={handleChangeInput} rows="7" />
                </div>

                <div className="row-1">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Chọn danh mục</option>
                        {
                            categories.map((category)=>(
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit?"Cập nhập":"Thêm"}</button>
            </form>
        </div>
    );
}

export default CreateProduct;