"use client"
import { data } from '../../json/data'
import { Nav } from "../../components/nav"
import Image from 'next/image'
import { Fragment } from 'react'
import { useState } from 'react'

export default function Home() {
  const [programData, setProgramData] = useState(data)

  const handleBookmark = (programIndex) => {
    // Create a copy of the program data array
    const updatedProgramData = [...programData]
    // Toggle the isBookmarked property of the clicked program
    updatedProgramData[programIndex].isBookmarked = !updatedProgramData[programIndex].isBookmarked
    // Update the state with the new program data
    setProgramData(updatedProgramData)
  }

  const [searchProgram, setSearchProgram] = useState('')
 
  return <div className="container lg:flex lg:gap-6">
  <Nav />
  <main>
    <div className='p-4 md:p-6 mt-2 md:mt-3 lg:mt-8'>
      <div className='flex gap-4'>
        <Image className='md:w-8 md:h-8' src='/images/icon-search.svg' alt='search-icon' width={24} height={24}/>
        <input className='bg-transparent w-9/12 md:text-2xl focus:border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red' type='text' placeholder='Search for movies or TV series' onChange={event => {setSearchProgram(event.target.value)}}/>
      </div>
        <section>
          <div className='mt-5 md:mt-10'>
            <h1 className='text-xl md:text-2.5xl text-white'>Trending</h1>
              <div className='flex overflow-x-scroll whitespace-nowrap scroll-smooth mt-4 md:mt-6 scrollbar-hide'>
              {data.filter((val => {
                if (searchProgram === '') {
                  return val
                } else if (val.title.toLowerCase().includes(searchProgram.toLocaleLowerCase())) {
                  return val
                }
              })).map((program, i) => {
                return (
                  <div className='flex-shrink-0' key={i}>
                    { program.isTrending === true &&
                    <div className='mr-3 group md:mr-9 relative'>
                      <div className='hover:brightness-50 transition ease-out delay-150'>
                        <Image className='md:hidden rounded-lg' width={240} height={140} src={program.thumbnail.trending?.small} alt={program.title}/>
                        <Image className='xs:hidden rounded-lg' width={470} height={230} src={program.thumbnail.trending?.large} alt={program.title}/>
                      </div>
                      { program.isBookmarked ? 
                      <div className='bookmark' onClick={() => handleBookmark(i)}>
                        <Image src="/images/icon-bookmark-full.svg" alt="bookmark-full" width={11.67} height={14} />
                      </div> :
                      <div className='bookmark hover:bg-white' onClick={() => handleBookmark(i)}> 
                        <Image className='group-hover:brightness-0' src="/images/icon-bookmark-empty.svg" alt="bookmark-empty" width={11.67} height={14} />
                      </div> }
                      <div className='flex invisible group-hover:visible absolute sm:left-16 md:left-44 sm:top-12 md:top-24 gap-4 lg:top-20 lg:left-20 bg-grey py-2 px-4 bg-opacity-25 rounded-full transition ease-out delay-150 cursor-pointer'>
                          <Image src="/images/icon-play.svg" alt="play" width={30} height={30} />
                          <span className='text-2xl'>Play</span>
                      </div>
                      <div className='ml-3 absolute top-20 md:top-40'>
                        <div className='flex text-xs md:text-base gap-2'>
                          <p>{program.year}</p>
                          <span>&#8226;</span>
                          {program.category === "Movie" && <Image className='md:w-5 md:h-5' src="/images/icon-category-movie.svg" alt='movie' width={12} height={12}/>}
                          {program.category === "TV Series" && <Image className='md:w-5 md:h-5' src="/images/icon-category-tv.svg" alt='tv' width={12} height={12}/>}
                          <p>{program.category}</p>
                          <span>&#8226;</span>
                          <p>{program.rating}</p>
                        </div>
                        <h2 className='mt-1.5 font-medium md:text-2xl'>{program.title}</h2>
                      </div>
                    </div>
                    }
                  </div>
                )}
              )}
            </div>
          </div>
        </section>
        <section>
          <div className='mt-5 md:mt-9'>
            <h1 className='text-xl md:text-2.5xl text-white'>Recommended for you</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 md:mt-4'>
            {data.filter((val => {
                if (searchProgram === '') {
                  return val
                } else if (val.title.toLowerCase().includes(searchProgram.toLocaleLowerCase())) {
                  return val
                }
              })).map((program, i) => {
              return (
                <Fragment key={i}>
                  { program.isTrending === false &&
                  <div className='mt-4 relative group'>
                    <div className='hover:brightness-50 transition ease-out delay-150'>
                      <Image className='md:hidden rounded-lg' src={program.thumbnail.regular?.small} alt={program.title}/>
                      <Image className='xs:hidden rounded-lg' src={program.thumbnail.regular?.large} alt={program.title}/>
                    </div>
                    { program.isBookmarked ? 
                    <div className='bookmark' onClick={() => handleBookmark(i)}>
                      <Image src="/images/icon-bookmark-full.svg" alt="bookmark-full" width={11.67} height={14} />
                    </div> :
                    <div className='bookmark group hover:bg-white' onClick={() => handleBookmark(i)}> 
                      <Image className='group-hover:brightness-0' src="/images/icon-bookmark-empty.svg" alt="bookmark-empty" width={11.67} height={14} />
                    </div> }
                    <div className='flex invisible group-hover:visible absolute sm:left-4 md:left-20 sm:top-10 md:top-20 lg:top-20 lg:left-20 gap-4 bg-grey py-2 px-4 bg-opacity-25 rounded-full cursor-pointer'>
                        <Image src="/images/icon-play.svg" alt="play" width={30} height={30} />
                        <span className='text-2xl'>Play</span>
                    </div>
                    <div className='mt-2'>
                        <div className='flex text-3xl md:text-base gap-1 md:gap-2'>
                          <p>{program.year}</p>
                          <span>&#8226;</span>
                          {program.category === "Movie" && <Image className='md:w-5 md:h-5' src="/images/icon-category-movie.svg" alt='movie' width={15} height={10}/>}
                          {program.category === "TV Series" && <Image className='md:w-5 md:h-5' src="/images/icon-category-tv.svg" alt='tv' width={15} height={10}/>}
                          <p>{program.category}</p>
                          <span>&#8226;</span>
                          <p>{program.rating}</p>
                        </div>
                        <h2 className='mt-1.5 font-medium md:text-2xl'>{program.title}</h2>
                    </div>
                  </div> 
                  }
                </Fragment>
              )}
            )}
            </div>
          </div>
        </section>
    </div>
  </main>
</div>
}



