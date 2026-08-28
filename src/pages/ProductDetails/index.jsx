import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductByIdThunk } from "../../thunkActionsCreator/productsThunks";
import Product from "../../components/Product";
import SimilarProducts from "../../components/SimilarProducts";
import Review from "../../components/Review";
import Loader from "../../components/Loader";
import Error404 from "../Error404";

import "./index.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, singleProduct, loadingSingle, errorSingle } = useSelector(
    (state) => state.products,
  );

  const productFromList = list?.data?.find(
    (p) => p.id.toString() === id.toString(),
  );
  const productToDisplay = productFromList || singleProduct;

  useEffect(() => {
    if (id && !productFromList) {
      dispatch(fetchProductByIdThunk(id));
    }
  }, [id]);

  if (loadingSingle && !productToDisplay) {
    return <Loader size="lg" />;
  }

  if (errorSingle && !productToDisplay) {
    return <Error404 />;
  }

  if (!productToDisplay) {
    return <Error404 />;
  }

  return (
    <main>
      <div className="product-details-page">
        <Product product={productToDisplay} />
        <SimilarProducts
          currentProduct={productToDisplay}
          reduxProducts={list?.data}
        />
        <Review productId={productToDisplay.id} />
      </div>
    </main>
  );
}
