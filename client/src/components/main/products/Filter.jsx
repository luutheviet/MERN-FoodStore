import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filter() {
    const state=useContext(GlobalState)
    const [categories]=state.categoriesAPI.categories
    const [category,setCategory]=state.productApi.category
    const [sort,setSort]=state.productApi.sort
    const [search,setSearch]=state.productApi.search

    const toCapitalize=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleCategory=e=>{
        setCategory(e.target.value)
    }

    return (
        <div className="filter_menu">
            <div className="filter-select">
                <span>Danh mục: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value="">Tất cả</option>
                    {
                        categories.map(category=>(
                            <option value={"category="+category._id} 
                            key={category._id}>{toCapitalize(category.name)}</option>
                        ))
                    }
                </select>
            </div>
            
            <div className="input-field-search">
                <input type="text" value={search} placeholder=" " 
                onChange={e=>setSearch(e.target.value)} />
                <label className="lable-input-search" htmlFor="email">Tìm món</label>
            </div>

            <div className="filter-select">
                <span>Sắp xếp theo: </span>
                <select name="sort" value={sort} onChange={e=>setSort(e.target.value)} >
                    <option value="">Mới</option>
                    <option value="sort=oldest">Cũ</option>
                    <option value="sort=-sold">Bán chạy</option>
                    <option value="sort=-price">Giá: Cao-Thấp</option>
                    <option value="sort=price">Giá: Thấp-Cao</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;