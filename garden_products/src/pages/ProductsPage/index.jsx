import React, { useEffect } from 'react'
import { getAllProducts } from '../../requests/products'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusAction } from '../../store/reducers/categoriesReducer';
import ProductsContainer from '../../components/ProductsContainer';

function ProductsPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts);
  }, []);

  const { products, status } = productsState;
  console.log('ProductsPage', products);
  
  
  return (
    <div>
        <ProductsContainer products={products} />
    </div>
  )
}
export default ProductsPage