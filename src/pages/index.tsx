import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({recommendedProducts}:HomeProps) {

  const handleSum = useCallback(async()=>{
    const math = (await (import('../lib/math'))).default;
    alert(math.sum(3,5));
  },[]);
  
  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
        <button onClick={handleSum}>Sum</button>
      </section>
    </div>
  );
}



export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = (await response.json()) as IProduct[];
  return {props: {recommendedProducts}};
}