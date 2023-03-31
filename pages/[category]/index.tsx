import Head from "next/head"
import { useRouter } from "next/router"

export default function Category() {
  const router = useRouter()
  const { category } = router.query
  return (
    <>
      <Head>
        <title>{category}</title>
      </Head>
      <div>{category}</div>
    </>
  )
}
