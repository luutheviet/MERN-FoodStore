import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';

function Categories() {
    const state=useContext(GlobalState)
    const [categories]=state.categoriesAPI.categories
    const [category,setCategory]=useState('')
    const [token]=state.token
    const [callback,setCallback]=state.categoriesAPI.callback
    const [onEdit,setOnEdit]=useState(false)
    const [id,setId]=useState('')

    const createCategory =async()=>{
        if(category===''){
            alert('Bạn chưa nhập tên danh sách!')
            return null
        }
        try {
            if(onEdit){
                const res=await axios.put(`/api/category/${id}`,{name:category},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res=await axios.post('/api/category',{name:category},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const editCategory=async(id,name)=>{
        setId(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory=async(id)=>{
        try {
            const res=await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="categories container mt-4" style={{paddingBottom:80}}>
            <label htmlFor="input-category">Thêm danh mục</label>
            <div className="input-group mb-3">
                <input id="input-category" type="text" value={category} className="form-control" placeholder="Danh mục" 
                aria-label="Danh mục" onChange={e=>setCategory(e.target.value)} aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" onClick={createCategory} 
                    type="button">{onEdit?"Sửa":"Thêm"}</button>
                </div>
            </div>
            <h2 className="text-center">Danh sách danh mục đã thêm</h2>
            <table className="table-order mt-4 w-100 mx-auto">
                    <thead>
                        <tr className="tr-order">
                            <th className="th-order">Tên danh mục</th>
                            <th className="th-order">Sửa</th>
                            <th className="th-order">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((item)=>(
                                <tr key={item._id}>
                                    <td className="td-order text-capitalize">{item.name}</td>
                                    <td className="td-order"><button className="btn btn-outline-success" 
                                    onClick={()=>editCategory(item._id,item.name)}>Sửa</button></td>
                                    <td className="td-order"><button className="btn btn-outline-danger" 
                                    onClick={()=>deleteCategory(item._id)}>Xóa</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default Categories;