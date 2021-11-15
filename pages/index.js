import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import classes from "../styles/recipes.module.css";
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const res = await client.getEntries({ content_type: "recipes" });

  return {
    props: {
      recipes: res.items,
      revalidate: 1,
    },
  };
}

export default function Recipes({ recipes }) {
  return (
    <div className={classes.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  );
}
