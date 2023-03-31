import Head from "next/head"
import { useRouter } from "next/router"
import style from "./style.module.css"

const categories = [
  "whats-new",
  "deliciously-exclusive",
  "limited-time-offers",
  "best-sellers",
  "pizza-deals",
  "pizza",
  "pasta",
  "bonding-bundles",
  "solo-meals",
  "chicken-and-sides",
  "drinks",
]

type Item = {
  id: number
  img: string
  label: string
  description: string
  price: number
}

type Items = Array<Item>

type Props = {
  items: Items
}

export default function Category({items}: Props) {
  const router = useRouter()
  const { category } = router.query
  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <div className={style.menu}>
        <div className={style.sidebar}></div>
        <div className={style.grid}>
          {
            items.map((item) => {
              return (
                <div key={item.label} className={style.card}>
                  <div className={style.image}>
                    <img draggable={false} src={item.img} alt={item.label} />
                  </div>
                  <div className={style.details}>
                    <span className={style.label}>{item.label}</span>
                    <span>
                      <div className={style.price}>₱ {item.price}.00</div>
                      <div className={style.order_now}>order now</div>
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

async function getCategory(category: string) {
  const response = await fetch(`https://api-greenwich-menu.vercel.app/menu/${category}`)
  const { data } = await response.json()
  return data
}

export async function getStaticPaths() {
  return {
    paths: categories.map((item) => ({params: {category: item}})),
    fallback: false
  }
}

export async function getStaticProps({params}: any) {
  const items = await getCategory(params.category)
  return {
    props: {
      items
    }
  }
}
