import { Card, Dropdown } from 'flowbite-react'

export default function LensCard({profile}) {
  const img = profile?.picture?.uri || profile?.picture?.original?.url
  return (
    <Card className="haha">
      <div className="">
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
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
        </div>
      </div>
    </Card>
  )
}
