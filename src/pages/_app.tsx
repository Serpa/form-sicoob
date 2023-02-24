import '@/styles/globals.css'
import { ClienteProvider } from 'contexts/ClienteContext'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { ConfigProvider } from 'antd';
import pt_BR from 'antd/locale/pt_BR';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider autoHideDuration={1500} preventDuplicate>
      <ConfigProvider locale={pt_BR}>
        <ClienteProvider>
          <Component {...pageProps} />
        </ClienteProvider>
      </ConfigProvider>
    </SnackbarProvider>
  )
}
