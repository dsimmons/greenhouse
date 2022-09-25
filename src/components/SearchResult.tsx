import { Button, Spinner } from 'flowbite-react'

import LensCard from './LensCard'

type Props = {
  profile?: Object,
  errorMsg?: string,
  isSearching: boolean,
}

export default function SearchResult(props: Props) {
  return (
    <div className="max-w-sm">
    {(props.isSearching) ? (
      <div className="flex justify-center">
        <Spinner size="xl" />
      </div>
    ) : (
      <LensCard profile={props.profile} />
    )}
    </div>
  )
}