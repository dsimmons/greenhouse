import { Button, Spinner } from 'flowbite-react'
import { useState } from 'react'
import type { NextPage } from 'next'

import Header from '../src/components/Header'
import Meta from '../src/components/Meta'
import Footer from '../src/components/Footer'
import SearchResult from '../src/components/SearchResult'

import { PLACEHOLDER_ENS_ADDR } from '../src/constants'
import * as api from '../src/api'

type Result = string | Object

const Home: NextPage = () => {
  const [ensAddr, setEnsAddr] = useState("")
  const [userHasSearched, setUserHasSearched] = useState(false)
  const [reqIsInFlight, setReqIsInFlight] = useState(false)
  const [profile, setProfile] = useState(null)
  const [err, setErr] = useState("")

  // TODO: I can clean up a lot of this state management, but I ran out of time
  // to do it more cleanly.
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    // If we have a pending search, wait for it to complete.
    //
    // We do this for a host of reasons, not the list of which is rate-limiting
    // via the default ethers.js provider (sans API keys)!
    if (reqIsInFlight) return

    // If a user immediately presses "Search" (or enter) without typing an
    // address into the box, pretend as if they typed in the placeholder ENS
    // address.
    console.log('placeholder', PLACEHOLDER_ENS_ADDR)
    if (!ensAddr) setEnsAddr(PLACEHOLDER_ENS_ADDR)
    setReqIsInFlight(true)

    if (!userHasSearched) setUserHasSearched(true)

    console.log('ensAddr', ensAddr)
    const ethAddr = await api.resolveEnsAddr(ensAddr || PLACEHOLDER_ENS_ADDR)
    console.log('ethAddr', ethAddr)
    if (!ethAddr) {
      setErr("ENS address doesn't exist!")
      setProfile(null)
      setReqIsInFlight(false)
      return
    }

    const result = await api.queryLensByAddr(ethAddr)
    const profile = result?.profiles?.items[0]
    console.log('profile', profile)
    if (!profile) {
      setErr(`${ensAddr} does not have a Lens profile :(`)
      setProfile(null)
      setReqIsInFlight(false)
      return
    }

    setErr("")
    setProfile(profile)
    setReqIsInFlight(false)
  }

  return (
    <div className="flex flex-col h-full min-h-screen bg-slate-50">
      <Meta />
      <Header />
      <main className="flex flex-col justify-center gap-20 px-6">
        <header className="">
          <h2 className="text-4xl text-center text-gray-900 font-semibold font-mono pt-6">
            Grow Your Web3 Roots
          </h2>
          <p className="text-xl text-center py-4">
            Greenhouse helps you find and discover frens on Lens!
          </p>
        </header>
        <section className="flex flex-col gap-3">
          <p className="text-center mt-2">
            Enter an <span className="font-bold">ENS address</span> below to check if the identity has a registered Lens profile.
          </p>
          <form className="flex flex-row justify-center" onSubmit={onSubmit}>
            <input
              value={ensAddr}
              onChange={e => setEnsAddr(e.target.value)}
              type="search"
              placeholder={PLACEHOLDER_ENS_ADDR}
              className="rounded z-10"
            />
            <Button
              type="submit"
              size="lg"
              disabled={reqIsInFlight}
              gradientDuoTone="tealToLime"
            >
              <span className="font-light">Search</span>
            </Button>
          </form>
          {userHasSearched && (
            <SearchResult
              isSearching={reqIsInFlight}
              errorMsg={err}
              profile={profile}
            />
          )}
        </section>
      </main>
      <div className="flex flex-grow" />
      <Footer />
    </div>
  )
}

export default Home
