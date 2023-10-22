"use client"
import { data } from "../../json/data"
import { Nav } from "../../components/nav"
import Image from 'next/image'
import { Fragment } from 'react'
import { useState } from 'react'
 
export default function tvSeries() {
    const [programData, setProgramData] = useState(data)

    const handleBookmark = (programIndex) => {
    
    const updatedProgramData = [...programData]
    
    updatedProgramData[programIndex].isBookmarked = !updatedProgramData[programIndex].isBookmarked
    
    setProgramData(updatedProgramData)
  }

  const [searchProgram, setSearchProgram] = useState('')
 
  return <div className="container lg:flex lg:gap-6">
  <Nav />
  <div>
    <div className='p-4 md:p-6 mt-2 md:mt-3 lg:mt-8'>
        <div className='flex gap-4'>
            <Image className='md:w-8 md:h-8' src='/images/icon-search.svg' alt='search-icon' width={20} height={20}/>
            <input className='bg-transparent w-9/12 md:text-2xl focus:border-b-2 outline-0 focus:border-light-grey pb-3 w-full caret-dark-red' type='text' placeholder='Search for TV series' onChange={event => {setSearchProgram(event.target.value)}}/>
        </div>
        <section>
            <div className='mt-5 md:mt-10'>
                <h1 className='text-xl md:text-2.5xl text-white'>TV Series</h1>
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
                            { program.category === "TV Series" &&
                            <div className='mt-4 relative group'>
                                <div className='hover:brightness-50 transition ease-out delay-150'>
                                    <Image className='md:hidden rounded-lg' src={program.thumbnail.regular?.small} alt={program.title}/>
                                    <Image className='xs:hidden rounded-lg' src={program.thumbnail.regular?.large} alt={program.title}/>
                                </div>
                                { program.isBookmarked ? 
                                <div className='bookmark' onClick={() => handleBookmark(i)}>
                                    <Image src="/images/icon-bookmark-full.svg" alt="bookmark-full" width={11.67} height={14} />
                                </div> :
                                <div className='bookmark hover:bg-white' onClick={() => handleBookmark(i)}> 
                                    <Image className='group-hover:brightness-0' src="/images/icon-bookmark-empty.svg" alt="bookmark-empty" width={11.67} height={14} />
                                </div> }
                                <div className='flex invisible group-hover:visible absolute sm:left-4 md:left-12 sm:top-10 md:top-12 lg:top-20 lg:left-20 gap-4 bg-grey py-2 px-4 bg-opacity-25 rounded-full cursor-pointer'>
                                    <Image src="/images/icon-play.svg" alt="play" width={30} height={30} />
                                    <span className='text-2xl'>Play</span>
                                </div>
                                <div className='mt-2'>
                                    <div className='flex text-xs md:text-base gap-2'>
                                        <p>{program.year}</p>
                                        <span>&#8226;</span>
                                        <Image src="/images/icon-category-tv.svg" alt='tv' width={20} height={20}/>
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
  </div>
</div>
}



