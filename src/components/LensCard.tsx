import { Card, Dropdown } from 'flowbite-react'

export default function LensCard({profile}: any) {
  const img = profile?.picture?.uri || profile?.picture?.original?.url

  return (
    <Card>
      <div>
        {img && (
          <img
            className="mb-3 h-16 w-16 rounded-md"
            src={img}
          />
        )}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {profile?.handle}
        </h5>
        <h5 className="mb-1 font-medium text-gray-900 dark:text-white">
          {profile?.name}
        </h5>
        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
          {profile?.bio}
        </p>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href={`https://www.lensfrens.xyz/${profile.handle}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#abfe2c] rounded-lg py-2 px-4 text-center text-sm font-semibold text-gray-700 hover:bg-green-300 focus:outline-none"
          >
            + Add fren
          </a>
        </div>
      </div>
    </Card>
  )
}
