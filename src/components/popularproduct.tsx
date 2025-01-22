'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; 

// Define the Product type based on your Sanity schema
interface Product {
  name: string;
  price: number;
  image: string;
  slug: string;
}

const Product: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      const query = `*[_type == "product" && "popular products" in tags]{
        name,
        price,
        "image": image.asset->url,
        slug
      }`;
      const products: Product[] = await client.fetch(query);
      setPopularProducts(products);
    };

    fetchPopularProducts();
  }, []);

  return (
    <>
      <section>
        <div className='px-8 py-12 text-[#2A254B] mt-10'>
          <h1 className='text-2xl'>Our popular products</h1>

          <div className='flex flex-col md:flex-row gap-8 mt-8'>
            {popularProducts.map((product, index) => (
              <div key={index} className='w-full md:w-[350px] h-auto group'>
                <Image
                  src={product.image}
                  height={800}
                  width={800}
                  alt={product.name}
                  className='w-full h-[80%] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                />
                <div className='mt-4 text-[#2A254B]'>
                  <p className='py-2'>{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View Collection Button */}
          <div className='my-6 flex justify-center items-center'>
            <Link href={'/productlisting'}>
              <button className='bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B] hover:bg-[#2A254B] hover:text-[#F9F9F9]'>
                View products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;