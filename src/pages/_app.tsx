import '@/styles/globals.css'
import { ClienteProvider } from 'contexts/ClienteContext'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { ConfigProvider } from 'antd';
import pt_BR from 'antd/locale/pt_BR';
import { SessionProvider } from "next-auth/react"
import SwrProvider from '../../components/srw-provider'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SwrProvider>
        <SnackbarProvider autoHideDuration={1500} preventDuplicate>
          <ConfigProvider locale={pt_BR}>
            <ClienteProvider>
              <Component {...pageProps} />
            </ClienteProvider>
          </ConfigProvider>
        </SnackbarProvider>
      </SwrProvider>
    </SessionProvider>
  )
}
