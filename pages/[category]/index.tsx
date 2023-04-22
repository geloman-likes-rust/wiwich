import Head from "next/head"
import { useRouter } from "next/router"
import style from "./style.module.css"
import Sidebar from "@/components/sidebar"

type Item = {
  id: number
  img: string
  label: string
  description?: string
  price: number
}

type Category = {
  id: number
  img: string
  category: string
  param: string
}

type Props = {
  items: Array<Item>
  menu: Array<Category>
}

export default function Category({items, menu}: Props) {
  const router = useRouter()
  const { category } = router.query
  return (
    <>
      <Head>
        <title>{category}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pizza.svg" />
      </Head>
      <div className={style.menu}>
        <div className={style.sidebar}>
          <Sidebar activeLink={category} categories={menu} />
        </div>
        <div className={style.grid}>
          {
            items.map((item) => {
              return (
                <div key={`${item.id}___${item.label}`} className={style.card}>
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

async function getCategory(category: string): Promise<Array<Item>> {
  const response = await fetch(`https://api-greenwich-menu.vercel.app/menu/${category}`)
  const { data } = await response.json()
  return data
}

async function getMenu(): Promise<Array<Category>> {
  const response = await fetch("https://api-greenwich-menu.vercel.app/menu")
  const { data } = await response.json()
  return data
}


export async function getStaticPaths() {
  const categories = await getMenu()
  return {
    paths: categories.map((item: Category) => ({params: {category: item.param}})),
    fallback: false
  }
}

export async function getStaticProps({params}: any) {
  const [menu, items] = await Promise.all([
    getMenu(),
    getCategory(params.category),
  ])

  return {
    props: {
      menu,
      items,
    }
  }
}
