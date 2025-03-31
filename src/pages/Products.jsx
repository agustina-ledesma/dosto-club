import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Spinner,
} from "@nextui-org/react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/merch.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error loading merch:", error));
  }, []);

  return (
    <>
      <div className="mt-6 border-b  border-[#1F352C]">
        <h1 className="text-2xl mx-4 my-5">SHOP</h1>
      </div>
      <div>
        {loading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="default" />
          </div>
        ) : (
          <div className="min-h-sccreen grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 ">
            {products.map((product) => (
              <div
                className="border-r border-b border-[#1F352C]"
                key={product.id}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block h-full w-full bg-white hover:bg-[#1F352C] transition-colors duration-300 group p-2"
                >
                  <div className="flex justify-between mx-1">
                    <p className="group-hover:text-white my-2 text-xs">
                      {product.name}
                    </p>

                    <Button
                      isIconOnly
                      className="bg-transparent hover:bg-transparent"
                      style={{ border: "none", boxShadow: "none" }}
                    >
                      <i
                        className={`bx bx-heart bx-xs text-[#1f352c] group-hover:text-white`}
                      ></i>
                    </Button>
                  </div>
                  <div className="w-full  m-auto cursor-pointer">
                    <img
                      alt={product.name}
                      className="w-full max-w-[400px] mx-auto px-1 max-h-[400px] object-cover"
                      src={product.image}
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="font-cinzel text-customGreen text-xs font-medium group-hover:text-white">
                      {product.name}
                    </h2>
                    <small className="font-cinzel text-customGreen text-xs group-hover:text-white">
                      ${product.price}
                    </small>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
