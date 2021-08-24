import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import {FaStar} from 'react-icons/fa'
import axios from 'axios';

function Detail() {
    const params=useParams()
    const state=useContext(GlobalState)
    const [reviews]=state.reviewsAPI.reviews
    const [products]=state.productApi.products
    const addCart=state.userAPI.addCart
    const [token]=state.token
    const [detailProduct,setDetailProduct]=useState([])
    const [rating,setRating]=useState(null)
    const [hover,setHover]=useState(null)
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [comment,setComment]=useState('')
    const [reviewCount,setReviewCount]=useState([])
    const [callback,setCallback]=state.reviewsAPI.callBack

    const ratingstar=['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

    useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id===params.id){
                    setDetailProduct(product)
                }
            });
        }
        const getReviewCount=()=>{
            let arr=[]
            reviews.forEach((review)=>{
                if(params.id===review.product_id){
                    arr.push(review)
                }
            })
            setReviewCount(arr)
        }
        getReviewCount()
    },[params.id,products,reviews])


    const sendReview=async(e)=>{
        e.preventDefault()
        let product_id=params.id
        if(name===''||email===''||comment===''){
            alert('Bạn cần nhập đủ thông tin')
            return null
        }
        if(rating===null){
            alert('Bạn cần đánh giá')
            return null
        }
        try {
            const res=await axios.post('/api/reviews',{
                name,
                email,
                comment,
                rate:rating,
                product_id
            },{
                headers:{Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
            setEmail('')
            setName('')
            setComment('')
            setRating(null)
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    const averageRate=()=>{
        let totalRate=0
        for(let i=0;i<reviewCount.length;i++){
            totalRate+=reviewCount[i].rate
        }
        let average=totalRate/reviewCount.length-1
        return (
            <div className="product1-rating">
                {
                    ratingstar.map((value,idx)=>{
                        if(average-idx>=1){
                            return (
                                <i key={idx} className="fa fa-star"></i>
                            )
                        }
                        if(average-idx>0&&average-idx<1){
                            return (
                                <i key={idx} className="fas fa-star-half-alt"></i>
                            )
                        }
                        return(
                            <i key={idx} className="far fa-star"></i>
                        )
                        
                    })
                }
            </div>
        )
    }

    if(detailProduct.length===0) return null
    return (
        <div className="section mt-4" style={{paddingBottom:80}}>
            <div className="container">
                <div className="row">
                    <div className="product1 product1-details clearfix">
                        <div className="row">
                            <div className="col-md-5">
                                <div id="product1-main-view">
                                    <div className="product1-view">
                                        <img src={detailProduct.images.url} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="product1-body">
                                    <div className="product1-label">
                                        <span>New</span>
                                    </div>
                                    <h2 className="product1-name">{detailProduct.title}</h2>
                                    <h3 className="product1-price">Giá: {String(detailProduct.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}đ</h3>
                                    <div>
                                        <div className="product1-rating">
                                            {
                                                averageRate()
                                            }
                                        </div>
                                        <span className="link-detail" to="#">{reviewCount.length} Nhận xét</span>
                                    </div>
                                    <p><strong>Trạng thái:</strong> Sẵn sàng</p>
                                    <p><strong>Đã bán: </strong>{detailProduct.sold}</p>
                                    <p>{detailProduct.description}
                                    </p>
    
                                    <div className="product1-btns">
                                        <button onClick={()=>addCart(detailProduct)} className="primary-btn add-to-cart"><i className="fa fa-shopping-cart"></i> Mua ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
    
                            <div className="col-md-12">
                                <div className="product1-tab">
                                    <ul className="tab-nav">
                                        <li><Link className="link-detail" data-toggle="tab" to="#tab2">Nhận xét {reviewCount.length}</Link></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="tab2" className="tab-pane active">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="product1-reviews">
                                                        {
                                                            reviewCount.map((review,i)=>{
                                                                    return(
                                                                        <div key={i} className="single-review">
                                                                            <div className="review-heading">
                                                                                <div><Link className="link-detail" to="#"><i className="far fa-user"></i> {review.name}</Link></div>
                                                                                <div><Link className="link-detail" to="#"><i className="fa fa-clock"></i> {new Date(review.createdAt).toLocaleDateString()}</Link></div>

                                                                                <div className="review-rating pull-right">
                                                                                    {
                                                                                        ratingstar.map((value,index)=>{
                                                                                            if(index+1<=review.rate){
                                                                                                return (
                                                                                                    <i key={value} className="fas fa-star"></i>
                                                                                                )
                                                                                            }else{
                                                                                                return(
                                                                                                    <i key={value} className="far fa-star"></i>
                                                                                                )
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="review-body">
                                                                                <p>{review.comment}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            })
                                                        }
                                                        <ul className="reviews-pages">
                                                            <li className="active">1</li>
                                                            <li><Link className="link-detail" to="#">2</Link></li>
                                                            <li><Link className="link-detail" to="#">3</Link></li>
                                                            <li><Link className="link-detail" to="#"><i className="fa fa-caret-right"></i></Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4 className="text-uppercase">Nhận xét của bạn:</h4>
                                                    <p>Địa chỉ email của bạn sẽ được ẩn.</p>
                                                    <form className="review-form" onSubmit={sendReview}>
                                                        <div className="form-group">
                                                            <input className="input" type="text" placeholder="Tên"
                                                             value={name} onChange={(e)=>setName(e.target.value)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <input className="input" type="email" placeholder="Email" 
                                                             value={email} onChange={(e)=>setEmail(e.target.value)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <textarea className="input" placeholder="Nhận xét" 
                                                             value={comment} onChange={(e)=>setComment(e.target.value)} ></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-rating">
                                                                <strong className="text-uppercase">Đánh giá: </strong>
                                                                <div className="stars">
                                                                    {[...Array(5)].map((star,i)=>{
                                                                        let ratingValue=i+1
                                                                        return(
                                                                            <label key={i}>
                                                                                <input type="radio"
                                                                                name="rating1"
                                                                                value={ratingValue}
                                                                                onClick={()=>setRating(ratingValue)}
                                                                                onMouseEnter={()=>setHover(ratingValue)}
                                                                                onMouseLeave={()=>setHover(null)} />
                                                                                <FaStar 
                                                                                className="start" 
                                                                                color={ratingValue<=(hover||rating)?"#ffc107":"#e4e5e9"}
                                                                                onMouseEnter={()=>setHover(ratingValue)}
                                                                                onMouseLeave={()=>setHover(null)}/>
                                                                            </label>
                                                                        )
                                                                    })}
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="primary-btn">Gửi nhận xét</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;