export const getSingelProductPage =(product_id, set_state)=>{
    fetch(`http://localhost:3333/products/${product_id}`)
    .then(res => res.json())
    .then(json =>set_state (json))
}
