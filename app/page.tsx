"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ItemProps {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export default function Home() {
  const [item, setItem] = useState<ItemProps>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // delay 3s

    let itemNumber = Math.round(Math.random() * 30 + 1);

    const res = await fetch(`https://dummyjson.com/products/${itemNumber}`);
    const data = await res.json();
    setIsLoading(false);
    setItem(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!item)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-orange-700 font-bold">Loading......</p>
      </div>
    );

  console.log(item);

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-2xl font-bold text-slate-950 mb-6">
        API Loading Button
      </h1>
      <article className="p-16 bg-gray-100 flex items-center flex-col shadow-sm  border-slate-300 font-medium my-10">
        <h2 className="text-xl font-semibold text-black mb-3">{item.title}</h2>
        <p className="text-center max-w-80 font-light">{item.description}</p>
        <p className="text-sm mt-3 text-bold">Price: ${item.price}</p>
      </article>
      <button
        className="py-3 px-12 bg-lime-300 rounded-md hover:bg-lime-400 transition"
        onClick={fetchProduct}
        disabled={!!isLoading}
      >
        {isLoading ? "Fetching..." : "Get Product"}
      </button>
    </main>
  );
}
