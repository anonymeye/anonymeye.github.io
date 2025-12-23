import '@/styles/globals.css'
import '@/styles/markdown.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

