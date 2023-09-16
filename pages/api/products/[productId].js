import { products } from "../products";

export default function (req, res) {
  const { productId } = req.query;
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}
