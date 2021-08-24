import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

function OderHistory() {
    const state=useContext(GlobalState)
    const [history,setHistory]=state.userAPI.history
    const [isAdmin]=state.userAPI.isAdmin
    const [token]=state.token

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
    },[token,isAdmin,setHistory])

    return (
        <div className="history-page container pt-4" style={{paddingBottom:80}}>
            <h2 className="text-center">{isAdmin?"Danh sách đơn hàng":"Lịch sử mua hàng"}</h2>
            <h3 className="text-center mb-4 mt-4">{isAdmin?`Danh sách ${history.length} các đơn hàng`
            :`Cảm ơn bạn đã đặt ${history.length} lần`}</h3>

                <table className="table-order">
                    <thead>
                        <tr className="tr-order">
                            {isAdmin?<th className="th-order">
                                Email
                            </th>:<th></th>}
                            <th className="th-order">Mã đơn hàng</th>
                            <th className="th-order">Ngày mua</th>
                            <th className="th-order">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map((item)=>(
                                <tr key={item._id}>
                                    {isAdmin?<td className="td-order">{item.email}</td>:<td></td>}
                                    <td className="td-order">{item.paymentID}</td>
                                    <td className="td-order">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="td-order"><Link style={{color:'blue'}} to={`/history/${item._id}`}>Xem</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        </div>
    );
}

export default OderHistory;