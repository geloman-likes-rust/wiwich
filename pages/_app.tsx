import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto_Condensed } from "next/font/google"

const roboto = Roboto_Condensed({
  weight: '700',
  subsets: ["latin"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  ) 
}
