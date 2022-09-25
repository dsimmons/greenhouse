import { Button, Spinner } from 'flowbite-react'

import LensCard from './LensCard'

type Props = {
  profile?: Object | null,
  errorMsg?: string,
  isSearching: boolean,
}

// TODO: Needs a refactor, but out of time.
export default function SearchResult(props: Props) {
  if (props.isSearching) {
    return (
      <div className="flex justify-center">
        <Spinner size="xl" />
      </div>
    )
  }

  if (props.errorMsg) {
    return (
      <div className="flex justify-center ">
        <p>{props.errorMsg}</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center ">
      <LensCard profile={props.profile} />
    </div>
  )
}
