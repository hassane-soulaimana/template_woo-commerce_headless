import {
  addProductToCart,
  deleteProductFromCart,
  substractProductFromCart,
} from "../../thunkActionsCreator/cartThunks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";

export function CartProduct({ item }) {
  const dispatch = useDispatch();

  const url_array = item.permalink.split("/");
  const slug = url_array[url_array.length - 2];

  return (
    <li className="cart-product">
      <Link to={/product/ + slug}>
        <img
          className="cart-product-thumbnail"
          src={
            item.images?.[0]?.src ||
            "https://placeholder.pics/svg/300/DEDEDE/555555/Produit%20sans%20illustration"
          }
          alt={item.name || "produit sans nom"}
        ></img>
        <h3
          dangerouslySetInnerHTML={{ __html: item.name || "produit sans nom" }}
        ></h3>
        {/* <span
          dangerouslySetInnerHTML={{
            __html:
              item.short_description ||
              item.description ||
              "pas de description",
          }}
        ></span> */}
        {item.variation &&
          item.variation.map((variation) => (
            <p key={variation.attribute}>
              {variation.attribute} : {variation.value}
            </p>
          ))}
        <p>Quantité: {item.quantity}</p>
        {item.prices && (
          <p>
            Total:{" "}
            {(parseInt(item.prices.price * item.quantity) / 100).toFixed(2) +
              item.prices.currency_suffix}
          </p>
        )}
      </Link>
      <div className="cart-product-actions">
        <button
          disabled={item.quantity === item.quantity_limits.maximum}
          onClick={() => {
            dispatch(
              addProductToCart({
                productId: item.id,
                quantity: 1,
                variation: item.variation?.[0] || [],
              }),
            );
          }}
        >
          Ajouter +
        </button>
        <button
          onClick={() => {
            dispatch(
              substractProductFromCart({
                itemKey: item.key,
                quantity: item.quantity,
              }),
            );
          }}
        >
          Reduire -
        </button>
        <button
          onClick={() => {
            dispatch(
              deleteProductFromCart({
                itemKey: item.key,
              }),
            );
          }}
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}
