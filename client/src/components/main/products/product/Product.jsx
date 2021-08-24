import { Link } from 'react-router-dom';
import Loading from '../../utils/loading/Loading';

function Product({product,isAdmin,loading,deleteProduct,addCart}) {

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
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
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