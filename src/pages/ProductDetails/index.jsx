import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProductByIdThunk } from "../../thunkActionsCreator/productsThunks";
import Product from "../../components/Product";
import SimilarProducts from "../../components/SimilarProducts";
import Review from "../../components/Review";
import Loader from "../../components/Loader";

import "./index.css";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, singleProduct, loadingSingle, errorSingle } = useSelector(
    (state) => state.products,
  );
  const categories = useSelector((state) => state.categories.items || []);

  const productFromList = list?.data?.find(
    (p) => p.id?.toString() === id?.toString(),
  );
  const productToDisplay = productFromList || singleProduct;

  // 1. Déclenchement du fetch si le produit n'est pas déjà en cache dans la liste
  useEffect(() => {
    if (id && !productFromList) {
      dispatch(fetchProductByIdThunk(id));
    }
  }, [id, productFromList, dispatch]);

  // 2. Calcul synchrone instantané (0 lag, pas de useState inutile)
  const categoryName = productToDisplay?.categories?.[0]?.name;
  const matchedCategory = categories.find(
    (cat) => cat.name?.toString() === categoryName?.toString(),
  );
  const bg = matchedCategory?.image?.src;

  // 3. Gestion des états de chargement / erreur
  if (loadingSingle && !productToDisplay) {
    return <Loader size="lg" />;
  }

  if (errorSingle && !productToDisplay) {
    return <div className="error-state">Erreur : {errorSingle}</div>;
  }

  if (!productToDisplay) {
    return <div className="not-found-state">Aucun produit trouvé.</div>;
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
        <div
          className="category-bg"
          style={{ "--cat-bg": bg ? `url(${bg})` : "none" }}
        ></div>
      </div>
    </main>
  );
}
