import Head from 'next/head'
import style from '@/styles/Home.module.css'

type Category = {
  id: number
  category: string
  img: string
  param: string
}

type Menu = Array<Category>

type Prop = {
  menu: Menu
}

export default function Home({menu}: Prop) {
  return (
    <>
      <Head>
        <title>pizza ko</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pizza.svg" />
      </Head>
      <main className={style.home}>
        <div className={style.paper}>
          <div className={style.image}>
            <img src="" alt="" />
          </div>
          <div className={style.name}><span></span></div>
        </div>
      </main>
    </>
  )
}

async function getMenu() {
  const response = await fetch("https://api-greenwich-menu.vercel.app/menu")
  const { data } = await response.json()
  return data
}

export async function getStaticProps() {
  const menu: Menu = await getMenu()
  return {
    props: {
      menu
    }
  }
}
