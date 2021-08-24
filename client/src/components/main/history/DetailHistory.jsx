import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

function DetailHistory() {
    const state=useContext(GlobalState)
    const [token]=state.token
    const [history,setHistory]=state.userAPI.history
    const [orderDetail,setOrderDetail]=useState([])
    const params=useParams()
    const [isAdmin]=state.userAPI.isAdmin
    const [status,setStatus]=useState(false)

    useEffect(()=>{
        if(token){
            const getHistory=async()=>{
                if(isAdmin){
                    const res=await axios.get('/api/payment',{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data)
                }else{
                    const res=await axios.get('/user/history',{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data)
                }
            }
            getHistory()
        }
        if(params.id){
            history.forEach(element => {
                if(element._id===params.id){
                    setOrderDetail(element)
                    setStatus(element.status)
                }
            });
        }
    },[params.id,history,status,token,isAdmin,setHistory])

    const completeOrder=async()=>{
        try {
            axios.put(`/api/payment/${params.id}`,{status:true},{
                headers:{Authorization:token}
            })
            setStatus(orderDetail.status)
            console.log(status)
        } catch (error) {
            alert(error.respone.data.msg)
        }
    }

    const deletePayment=async()=>{
        try {
            axios.delete(`/api/payment/${params.id}`,{
                headers:{Authorization:token}
            })
            alert("Xóa thành công")
            setOrderDetail([])
            window.location.href="/history"
        } catch (error) {
            alert(error.respone.data.msg)
        }
    }

    if(orderDetail.length===0) return <div className="history-page container mt-4" style={{paddingBottom:80,height:'100vh'}}><Loading /></div>
    return (
        <div className="history-page container mt-4" style={{paddingBottom:80}}>
            <h2 className="text-center">Lịch sử mua hàng</h2>
                <table className="table-order">
                    <thead className="thead-order">
                        <tr className="tr-order">
                            <th className="th-order">Tên khách</th>
                            <th className="th-order">Ngày mua</th>
                            <th className="th-order">Địa chỉ</th>
                            <th className="th-order">Trạng thái</th>
                            {isAdmin?<th className="th-order">Hủy đơn hàng</th>:null}
                        </tr>
                    </thead>
                    <tbody className="tbody-order">
                        <tr className="tr-order">
                            <th className="th-order">{orderDetail.name}</th>
                            <th className="th-order">{orderDetail.createdAt}</th>
                            <th className="th-order">{orderDetail.address}</th>
                            <th className="th-order">{
                                isAdmin?status?"Đã giao":<button onClick={completeOrder} className="btn btn-success">Hoàn tất</button>
                                    :orderDetail.status?'Thành công':'Đang xử lý'
                            }</th>
                            {isAdmin?<th className="th-order"><button onClick={deletePayment} className="btn btn-danger">
                                {status?"Xóa":"Hủy"}</button></th>:null}
                        </tr>
                    </tbody>
                </table>
                <h2 className="text-center mt-4">Chi tiết sản phẩm đã mua</h2>
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giá</th>
                                <th className="text-center">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderDetail.cart.map(product=>(
                                    <tr key={product._id}>
                                        <td>
                                            <div className="product-item">
                                                <Link to={`/detail/${product._id}`} className="product-thumb">
                                                    <img className="img-cart" src={product.images.url} alt="" />
                                                </Link>
                                                <div className="product-info">
                                                    <h4 className="product-title"><Link to={`/detail/${product._id}`}>{product.title}</Link></h4>
                                                    <span><em>ID:</em> {product.product_id}</span>
                                                    <span><em>Description:</em> {product.description}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="count-input">
                                                <span>{product.quantity}</span>
                                            </div>
                                        </td>
                                        <td className="text-center text-lg text-medium">${product.price}</td>
                                        <td className="text-center text-lg text-medium">${product.price*product.quantity}</td>
                                    </tr>
                                ))
                            }
                            
                                
                            
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default DetailHistory;