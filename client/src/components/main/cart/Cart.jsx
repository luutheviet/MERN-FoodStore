import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function Cart() {
    const state=useContext(GlobalState)
    const [cart,setCart]=state.userAPI.cart
    const [token]=state.token
    const [total,setTotal]=useState(0)
    const [address,setAddress]=useState('')

    useEffect(()=>{
        const getTotal=()=>{
            const total=cart.reduce((prev,item)=>{
                return prev+(item.price*item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])

    const addToCart=async(cart)=>{
        await axios.patch('/user/addcart',{cart},{
            headers:{Authorization:token}
        })
    }

    const increment=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity+=1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement=(id)=>{
        cart.forEach(item=>{
            if(item._id===id){
                item.quantity===1?item.quantity=1:item.quantity-=1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct=(id)=>{
        if(window.confirm("Bạn có muốn xóa món này?")){
            cart.forEach((item,index)=>{
                if(item._id===id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }

    const onChangeAddress=(e)=>{
        setAddress(e.target.value)
    }

    const payment=async ()=>{
        const paymentID='PAYMENT-'+Math.floor(Math.random() * 1000000)+'VIET';
        if(address!==''){
            await axios.post('/api/payment',{cart,paymentID,address},{
                headers:{Authorization:token}
            })
            setCart([])
            addToCart([])
            alert("Thanh toán thành công!")
        }else{
            alert("Bạn chưa điền địa chỉ!")
        }
    }

    if(cart.length===0){
        return <h2 className="text-center mt-4">Không có gì trong giỏ hàng</h2>
    }
    return (
        <div className="container" style={{paddingBottom:80}}>
            <div className="table-responsive shopping-cart">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center pr-4">Sản phẩm</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Tổng</th>
                            <th className="text-center">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(product=>(
                                <tr key={product._id}>
                                    <td>
                                        <div className="product-item">
                                            <Link to={`/detail/${product._id}`} className="product-thumb">
                                                <img className="img-cart" src={product.images.url} alt="" />
                                            </Link>
                                            <div className="product-info">
                                                <h4 className="product-title"><Link to={`/detail/${product._id}`}>{product.title}</Link></h4>
                                                <span><em>ID:</em> {product.product_id}</span>
                                                <span><em>Mô tả:</em> {product.description}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="count-input">
                                            <button onClick={()=>decrement(product._id)}>-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={()=>increment(product._id)}>+</button>
                                        </div>
                                    </td>
                                    <td className="text-center text-lg text-medium">${product.price}</td>
                                    <td className="text-center text-lg text-medium">${product.price*product.quantity}</td>
                                    <td className="text-center"><button onClick={()=>removeProduct(product._id)} className="remove-from-cart" data-toggle="tooltip" title="" data-original-title="Remove item"><i className="fa fa-trash"></i></button></td>
                                </tr>
                            ))
                        }
                        
                            
                        
                    </tbody>
                </table>
            </div>
            <div className="shopping-cart-footer">
                <div className="column text-lg">Tổng: <span className="text-medium">${total}</span></div>
            </div>
            <div className="shopping-cart-footer">
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" placeholder="Địa chỉ" value={address} onChange={onChangeAddress}/>
                </Form.Group>
            </div>
            <div className="shopping-cart-footer">
                <div className="column"><Link className="btn btn-outline-secondary" to="/"><i className="icon-arrow-left"></i>&nbsp;Về trang chủ</Link></div>
                <div className="column">
                    <Link className="btn btn-success" onClick={payment}>Đặt hàng</Link>
                </div>
            </div>
            
        </div>
    );
}

export default Cart;