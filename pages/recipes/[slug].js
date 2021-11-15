import { createClient } from "contentful";
import Image from 'next/image'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import classes from '../../styles/recipeDetail.module.css'
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recipes" });
  console.log("getStaticPats res: ",res)
  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  console.log("params",params)
  const { items } = await client.getEntries({
    content_type: "recipes",
    "fields.slug": params.slug,
  });
  return {
    props: { recipe: items[0]}
  }
}

export default function RecipeDetails({ recipe }) {
  const {featuredImage, title, cookingTime, ingredients, method} = recipe.fields
  return (
  <div>
    <div className={classes.banner}>
      <Image src={'https:' + featuredImage.fields.file.url} 
        width="1200px"
        height="400px" 
      />
      <h2>{title}</h2>
    
      <div className={classes.info}>
        <p>Take about {cookingTime} mins to cook</p>
        <h3>Ingredients:</h3>
        {ingredients.map(ing => (
          <span key={ing}>{ing}</span>
        ))}
      </div>
     
      <div className={classes.method}>
      <h3>Method:</h3>
      <div>{documentToReactComponents(method)}</div>
      </div>
    
    </div>
  </div>
  
  )
}
