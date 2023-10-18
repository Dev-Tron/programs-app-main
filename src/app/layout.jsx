"use client"
import Providers from '@src/components/providers'
import '../../styles/globals.css'
import Head from 'next/head'
import { Attribution } from 'src/components/footer'


export default function RootLayout({ children }) {
  return (
    <html lang='en'>
        <Head>
          <title>Entertainment App</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        </Head>
        <body className='bg-dark-blue font-outFit font-light text-white'>
          <Providers>
            {children}
            <Attribution />
          </Providers>
        </body>
    </html>    
  )
}
