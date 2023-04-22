import Link from "next/link"
import style from "./style.module.css"

type Category = {
  id: number
  category: string
  img: string
  param: string
}

type Props = {
  categories: Array<Category>,
  activeLink: string | string[] | undefined
}

export default function Sidebar({categories, activeLink}: Props) {
  return (
    <ul className={style.sidebar}>
      {categories.map((item: Category) => {
        return (
          <li key={item.param} className={`${style.item} ${item.param === activeLink ? style.active : ""}`}>
            <Link href={item.param}>
              <div className={style.contents}>
                <div className={style.image}>
                  <img src={item.img} alt={item.category} />
                </div>
                <p>{item.category}</p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
