import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";

function Home(){
    const {page} = useParams();
    console.log(page);

    const [product, setProducts] = useState([]);
    const [pages, setPages] = useState(0);

    const limit = 3;
    const offset = (page-1)*limit;
    console.log(offset);
    // fetch(`http://localhost:3003/products?limit=${limit}&offset=${offset}`)
    useEffect(() => {
        fetch(`http://localhost:3003/products?limit=${limit}&offset=${offset}`)
             .then((res) => res.json())
             .then((data) => {
                console.log(Math.ceil(data.count / limit));
                setProducts(data.products);
                setPages(Math.ceil(data.count / limit));
             })
             .catch((err) => {
                console.log(err.message);
             });
       }, [limit, offset]);

       const handlePageClick = (pageNumber) => {
                // Update URL to navigate to the selected page
                window.location.href = `/products/${pageNumber}`;
            }
            console.log(pages);
    return(
        <div>
            home
            {product.map((item,index)=>{
               return <li key={index}>name: {item.name}, price: {item.price}</li>
            })}
            <div>
            
                {[...Array(pages)].map((_, index) => {
                    const pageNumber = index + 1;
                    
                    return (
                        <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

        </div>
    )
}
export default Home;


