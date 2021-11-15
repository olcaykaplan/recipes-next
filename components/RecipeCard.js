import Link from 'next/link'
import Image from 'next/image'
import classes from '../styles/recipes.module.css'

export default function RecipeCard({recipe}) {
    const { title, slug, cookingTime, thumbnail } = recipe.fields
    return (
        <div className={classes.card}>
            <div className={classes.featured}>
                <Image
                    src={'https:'+thumbnail.fields.file.url}
                    width="600px"
                    height="400px"
                />
                {/* {image - thumb} */}
            </div>
          <div className={classes.content}>
              <div className={classes.info}>
                  <h4>{title}</h4>
                  <p>Takes approx {cookingTime} mins to make</p>
                  <div className={classes.actions}>
                      <Link href={'/recipes/'+slug}><a>Cook this</a></Link>
                  </div> 
              </div>
          </div>
        </div>
    )
}
