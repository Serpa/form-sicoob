import { SWRConfig } from "swr";

export default function SwrProvider({ children }) {
    return <SWRConfig
        value={{
            onErrorRetry(error, key, config, revalidate, { retryCount }) {
                if (error.status === 404) return
                if (retryCount >= 10) return

                setTimeout(() => revalidate({ retryCount }), 1000)
            },
            refreshInterval: 3000,
            fetcher: (url) => fetch(url, {
                cache: 'no-store',
            }).then(res => res.json()),
        }}
    >{children}</SWRConfig>;
}