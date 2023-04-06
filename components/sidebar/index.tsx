import Link from "next/link"
import style from "./style.module.css"

type Category = {
  id: number
  category: string
  img: string
  param: string
}

type Categories = Array<Category>

type Props = {
  categories: Categories
  activeLink: string
}

export default function Sidebar({categories, activeLink}: Props) {
  return (
    <ul className={style.sidebar}>
      {categories.map((item: Category) => {
        return (
          <li className={`${style.item} ${activeLink === item.param ? style.active : ""}`} key={item.param}>
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
