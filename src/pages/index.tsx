import { GetServerSideProps } from "next";
import Link from 'next/link';
import { useCallback, useEffect, useState } from "react";
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";


interface HomeProps {
  recommendedProducts: Document[]
}

export default function Home({recommendedProducts}:HomeProps) {

  const handleSum = useCallback(async()=>{
    const math = (await (import('@/lib/math'))).default;
    alert(math.sum(3,5));
  },[]);
  
  return (
    <div>
      <SEO image={'boost.png'} title={'DevCommerce, your best eCommerce for development things'} shouldExcludeTitleSuffix />

      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={handleSum}>Sum</button>
      </section>
    </div>
  );
}



export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  // const response = await fetch(`${process.env.API_URL}/recommended`);
  // const recommendedProducts = (await response.json()) as IProduct[];
  const recommendedProducts = await client()
    .query([Prismic.Predicates.at('document.type','product')]);
  return {props: {recommendedProducts:recommendedProducts.results}};
}