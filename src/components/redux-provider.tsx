// redux-provider.tsx
"use client"

import { useHasMounted } from "@/lib/useHasMounted"
import { persistor, store } from "@/store"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Loader2 } from "lucide-react"
import { ReduxProviderProps } from "@/lib/types"




const LoaderFallback = () => (
  <div className="flex flex-col items-center justify-center h-screen text-gray-600 dark:text-gray-300">
    <Loader2 className="animate-spin h-6 w-6 mb-2" />
    <span>Loading application...</span>
  </div>
)

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const mounted = useHasMounted()

  if (!mounted)
    return (
      <LoaderFallback/>
    )

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoaderFallback/>}
        persistor={persistor}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
