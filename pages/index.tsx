import { Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
// import styles from '../styles/Home.module.css'

import Header from '../src/components/Header'
import Meta from '../src/components/Meta'
import SearchResult from '../src/components/SearchResult'

import * as api from '../src/api';

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [ensAddr, setEnsAddr] = useState("");
  const [shouldShowSearchResults, setShouldShowSearchResults] = useState(false);
  const [reqIsInFlight, setReqIsInFlight] = useState(false);
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState(null);

  // TODO: I can clean up a lot of this state management, but I ran out of time
  // to do it more cleanly.
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setShouldShowSearchResults(true);

    // If we have a pending search, wait for it to complete.
    //
    // We do this for a host of reasons, not the list of which is rate-limiting
    // via the default ethers.js provider (sans API keys)!
    if (reqIsInFlight) return
    setReqIsInFlight(true)

    const ethAddr = await api.resolveEnsAddr(ensAddr)
    console.log('ethAddr', ethAddr)
    if (!ethAddr) {
      setErr("ENS address doesn't exist!")
      setProfile(null)
      setReqIsInFlight(false)
    }

    const result = await api.queryLensByAddr(ethAddr);
    const profile = result?.profiles?.items[0]
    console.log('profile', profile)
    if (!profile) {
      setErr(`${ensAddr} does not have a Lens profile :(`)
      setProfile(null)
      setReqIsInFlight(false)
    }

    setErr(null)
    setProfile(profile)
    setReqIsInFlight(false);
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Meta />
      <Header />
      <main className="flex justify-center py-6">
        <section className="flex flex-col gap-3">
          <header className="max-w-md mb-6">
            <h2 className="text-xl text-center font-semibold py-1">
              Grow & Spread Your Web3 Roots
            </h2>
            <p className="text-center">
              Greenhouse helps you find and discover frens on Lens!
            </p>
            <p className="text-center mt-2">
              Enter an ENS address below to check if the identity has a registered Lens profile.
            </p>

          </header>
          <form className="flex flex-row gap-3" onSubmit={onSubmit}>
            <input
              value={ensAddr}
              onChange={e => setEnsAddr(e.target.value)}
              type="search"
              placeholder="vitalik.eth"
              className="px-4 py-3 rounded"
            />
            <Button className="px-4 py-3" type="submit">Search</Button>
          </form>
          {shouldShowSearchResults && (
            <SearchResult
              isSearching={reqIsInFlight}
              profile={profile}
            />
          )}
        </section>
      </main>
      <div className="flex flex-grow" />
      <footer className="flex justify-center">
        <span className="text-gray-400">Made with ❤️ @ ETHOnline 2022</span>
      </footer>
    </div>
  )
}

export default Home
