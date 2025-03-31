import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeartIcon } from "../components/HeartIcon";
import Rating from "@mui/material/Rating";
import { Button, Spinner } from "@nextui-org/react";

const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/merch.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((item) => item.id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="default" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/shop" className="text-customGreen underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen border-[#1F352C] border-b-1">
      {/* Imagen */}
      <div className="flex flex-col md:border-r-1 border-b-1 md:border-b-0 border-[#1F352C] bg-[#1F352C] py-4">
        <div className="flex w-full justify-center items-center mx-auto">
          <img
            alt={product.name}
            className="w-full max-h-[750px] max-w-[700px] px-2  object-cover"
            src={product.image}
          />
        </div>
      </div>

      {/* Info del Producto */}
      <div className="flex flex-col">
        <div className="m-3">
          <div className="m-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-medium my-1 font-cinzel text-customGreen">
                {product.name}
              </h1>
              <Button
                isIconOnly
                className="bg-transparent border border-customGreen text-customGreen hover:bg-customGreen hover:text-white"
                aria-label="Like"
              >
                <HeartIcon />
              </Button>
            </div>

            <p className="my-4 text-md text-customGreen">
              {product.description}
            </p>
            <p className="text-lg font-semibold font-cinzel text-customGreen">
              ${product.price}
            </p>
          </div>

          <div>
            <div className="flex flex-col mx-2 my-5">
              {/* Botón de compra */}
              <div className="flex justify-between items-center mx-2 my-5">
                <span>
                  Over 11,200+ other people have already rated this product{" "}
                </span>
                <Rating name="read-only" value={3} size="large" readOnly />
              </div>
              <div className="w-full">
                <Button
                  size="lg"
                  isDisabled
                  className="w-full bg-transparent border-1 text-customGreen border-[#1F352C]"
                >
                  OUT OF STOCK
                </Button>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="w-1/2 p-4 flex flex-col gap-2 bg-neutral-50 text-center rounded-2xl text-customGreen ">
                  <i class="bx bx-credit-card"></i>
                  <span>All payment methods</span>
                </div>
                <div className="w-1/2 p-4 flex flex-col gap-2 bg-neutral-50 text-center rounded-2xl text-customGreen">
                  <i class="bx bx-package"></i>
                  <span>Free shipping and returns</span>
                </div>
              </div>

              <div className="mx-2 mt-8">
                <h2 className="text-md font-semibold text-customGreen">
                  How to Take Care of Your Product
                </h2>
                <ul className="list-disc ml-5 text-sm mt-4 text-customGreen">
                  <li>Wash inside out with cold water.</li>
                  <li>Do not bleach.</li>
                  <li>Air dry or tumble dry on low heat.</li>
                  <li>Do not iron directly on the print.</li>
                  <li>Avoid excessive exposure to sunlight.</li>
                  <li>Store in a cool, dry place.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductId;
