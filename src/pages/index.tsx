import { useEffect, useState } from 'react';
import {Title} from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
};

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(()=>{
    (async()=>{
      const response = await fetch('http://localhost:3333/recommended');
      const data = await response.json() as IProduct[];
      setRecommendedProducts(data);
    })();
  },[]);

  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct=>(
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>  
    </div>
  )
}
