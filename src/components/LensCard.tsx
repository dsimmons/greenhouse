import { Card, Dropdown } from 'flowbite-react'

export default function LensCard({profile}: any) {
  const img = profile?.picture?.uri || profile?.picture?.original?.url

  return (
    <Card>
        <div className="flex">
          {img && (
            <img
              className="h-16 w-16 rounded-md"
              src={img}
            />
          )}
          <div className="pl-4">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white">
              {profile?.handle}
            </h1>
            <h2 className="font-light">
              {profile?.name}
            </h2>
          </div>
        </div>
        <p className="max-w-xs text-gray-900 font-light text-sm">
          {profile?.bio}
        </p>
        <div className="flex justify-center">
          <a
            href={`https://www.lensfrens.xyz/${profile.handle}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#abfe2c] rounded-lg py-2 px-4 text-center text-sm font-semibold text-gray-700 hover:bg-green-300 focus:outline-none"
          >
            + Add fren
          </a>
        </div>
    </Card>
  )
}
