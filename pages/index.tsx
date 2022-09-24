import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import type { NextPage } from 'next'

// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [ensAddr, setEnsAddr] = useState("");

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="h-screen bg-slate-50">
      <Head>
        <title>Greenhouse | Grow your web3 roots!</title>
        <meta name="description" content="Grow your web3 roots! Greenhouse helps you find and connect with like-minded frens on the Lens protocol." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <header
        className='bg-[#abfe2c] p-2'
      >
        <Image
          src='/logo-sans-bg.svg'
          alt='Greenhouse Logo'
          width={150}
          height={65}
          className='hover:fill-[#ffcc00]'
        />
      </header>
      <main className="flex justify-center items-center">
        <section className="">
          <form onSubmit={onSubmit}>
            <input
              value={ensAddr}
              onChange={e => setEnsAddr(e.target.value)}
              type="search"
              placeholder="vitalik.eth"
              className="px-4 py-3 rounded"
            />
          </form>
        </section>
      </main>
      <footer>
        Made with ❤️ @ ETHOnline 2022.
      </footer>
    </div>
  )
}

export default Home
