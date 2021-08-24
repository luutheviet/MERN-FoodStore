import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import Product from '../products/product/Product'

function DetailProduct() {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.productApi.products
    const addCart=state.userAPI.addCart
    const [detailProduct,setDetailProduct]=useState([])
    useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id===params.id){
                    setDetailProduct(product)
                }
            });
        }
    },[params.id,products])
    if(detailProduct.length===0) return null
    return (
        <>
        <div className="detail-product container">
            <div className="detail-content row">
                <div className="product-detail-img col-xl-4 col-12 col-sm-6 col-md-6 col-lg-4" style={{backgroundImage:`url(${detailProduct.images.url})`}}></div>
                <div className="box-detail col-xl-4 col-12 col-sm-6 col-md-6 col-lg-4">
                    <h2 className="product-detail-title">{detailProduct.title}</h2>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Đã bán: {detailProduct.sold}</p>
                    <span className="product-detail-price text-danger">Giá: {String(detailProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}đ</span>
                    <Link onClick={()=>addCart(detailProduct)} to="/cart" className="btn-detail-add-cart">
                        <i className="fas fa-plus-circle"></i>
                        Thêm
                    </Link>
                </div>
                <div className="review-container col-xl-4 col-sm-12 col-md-12 col-lg-4">
                    <div className="product-review">
                        <h2 className="">Review</h2>
                        <div className="review-box">
                            <div className="user-avatar">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="review-content">
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="review-comment">
                                    <p>Rat ngon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="related-products container">
            <h2 className="text-center">Sản Phẩm Liên Quan</h2>
            <div className="products row">
                {
                    products.map(product=>{
                        return product.category===detailProduct.category?<Product key={product._id} product={product} />:null
                    })
                }
            </div>
        </div>
        </>
    );
}

export default DetailProduct;