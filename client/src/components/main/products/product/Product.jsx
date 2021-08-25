import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import Loading from '../../utils/loading/Loading';

function Product({product,isAdmin,loading,deleteProduct,addCart}) {
    const state=useContext(GlobalState)
    const [reviews]=state.reviewsAPI.reviews
    const [reviewCount,setReviewCount]=useState([])

    const ratingstar=['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

    useEffect(()=>{
        const getReviewCount=()=>{
            let arr=[]
            reviews.forEach((review)=>{
                if(product._id===review.product_id){
                    arr.push(review)
                }
            })
            setReviewCount(arr)
        }
        getReviewCount()
    },[reviews,product._id])

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

    if(loading) return <div className="product col-xl-3 col-lg-3 col-md-4 col-sm-6"><Loading/></div>
    return (
        <div className="product col-xl-3 col-lg-3 col-md-4 col-sm-6">
            <div className="product-img" style={{backgroundImage:`url("${product.images.url}")`}}>
                <Link to={`/detail/${product._id}`} className="detail-product-icon">
                    <i className="fas fa-eye"></i>
                </Link>
            </div>
            <div className="product-detail">
                <div className="product-title">
                    <Link to={`/detail/${product._id}`}>{product.title}</Link>
                </div>
                <div className="start-rate">
                    {
                        averageRate()
                    }
                    <span style={{marginTop:4,display:'block'}}
                     >{reviewCount.length===0?"Chưa có đánh giá":`Có ${reviewCount.length} đánh giá`}</span>
                </div>
                <div className="product-price">
                    <p>{String(product.price).replace(/(.)(?=(\d{3})+$)/g,'$1.')}đ</p>
                </div>
                <div className="product-des__short">
                    <p>{product.description}</p>
                </div>
            </div>
            <div className="product-btn">
                {
                    isAdmin?<>
                        <Link to="#" className="btn-delete" onClick={()=>deleteProduct(product.images.public_id,product._id)} >
                            Delete
                        </Link>
                        <Link to={`edit_product/${product._id}`} className="btn-edit">
                            Edit
                        </Link>
                    </>
                    :<Link to="#" className="btn-add-cart" onClick={()=>addCart(product)}>
                        <i className="fas fa-plus-circle"></i>
                        Thêm vào giỏ
                    </Link>
                }
            </div>
        </div>
    );
}

export default Product;