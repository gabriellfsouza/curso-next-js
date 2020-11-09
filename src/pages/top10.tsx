import { GetStaticProps } from "next";
import {Document} from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';

import { client } from "@/lib/prismic";
// interface IProduct {
//   id: string;
//   title: string;
// }

interface Top10Props {
  products: Document[];
}

export default function Top10({products}:Top10Props){
  return (<div>
    <h1>Top 10</h1>
    <ul>
      {products.map(recommendedProduct=>
        <li key={recommendedProduct.id}>{PrismicDOM.RichText.asText(recommendedProduct.data.title)}</li>
      )}
    </ul>
  </div>)
}

export const getStaticProps: GetStaticProps<Top10Props> = async(context)=>{
  const products = await client()
    .query([Prismic.Predicates.at('document.type','product')]);
  // const response = await fetch(`${process.env.API_URL}/products`);
  // const products = (await response.json()) as IProduct[];
  return {props: {products:products.results},revalidate: 5};
}