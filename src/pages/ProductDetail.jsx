import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import ProductDetailCard from "../components/ProductDetailCard.jsx";



function ProductDetail(){
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    console.log("ID dari URL:", id);

    useEffect(() => {
        getProductById(id).then(data => setProduct(data));
    }, [id]);

    if (!product) 
        return <p>Loading...</p>;
    return <ProductDetailCard product={product} />;
}

export default ProductDetail;