import { ethers } from 'ethers'
import { request } from 'graphql-request'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { LENS_API_URI } from '../src/constants';
import { getProfile } from '../src/queries';

import type { NextPage } from 'next'

// import styles from '../styles/Home.module.css'

async function resolveEnsAddr(ensAddr) {
  return ethers.getDefaultProvider().resolveName(ensAddr);
}

async function queryLensByAddr(addr) {
  return request(LENS_API_URI, getProfile, { addr });
}

const Home: NextPage = () => {
  const [ensAddr, setEnsAddr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()

    const ethAddr = await resolveEnsAddr(ensAddr)
    console.log(ethAddr)
    // TODO: Handle invalid ENS.

    const lensProfile = await queryLensByAddr(ethAddr);
    console.log(lensProfile)
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
