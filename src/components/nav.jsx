import Link from 'next/link'
import Image from 'next/image'


export const Nav = () => {
  return (
    <header>
        <nav>
            <div className='navbar'>
            <Image className='md:w-8 md:h-6' src='/images/logo.svg' alt='logo-icon' width={25} height={20}/>
                <div className='sm:flex lg:flex-col gap-5 md:gap-9 lg:mt-32 lg:ml-2'>
                    <Link href='/home'>
                        <Image className='md:w-5 md:h-5' src='/images/icon-nav-home.svg' alt='home-icon' width={16} height={16}/>
                    </Link>
                    <Link href='/movies'>
                        <Image className='md:w-5 md:h-5' src='/images/icon-nav-movies.svg' alt='movie-icon' width={16} height={16}/>
                    </Link>
                    <Link href='/tv-series'>
                        <Image className='md:w-5 md:h-5' src='/images/icon-nav-tv-series.svg' alt='tv-series-icon' width={16} height={16}/>
                    </Link>
                    <Link href='/bookmarks'>
                        <Image className='md:w-5 md:h-5' src='/images/icon-nav-bookmark.svg' alt='bookmark-icon' width={16} height={16}/>
                    </Link>
                </div>
            <Image className='md:w-8 md:h-8 lg:w-10 lg:h-10' src='/images/image-avatar.png' alt='avatar-icon' width={24} height={24}/>
            </div>
        </nav>
    </header>
  )
}

