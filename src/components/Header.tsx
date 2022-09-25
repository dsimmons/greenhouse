import Image from 'next/image'

export default function Header() {
  return (
    <header
      className='bg-[#abfe2c] p-2'
    >
      <Image
        src='/logo-sans-bg.svg'
        alt='Greenhouse Logo'
        width={150}
        height={65}
      />
    </header>
  )
}
