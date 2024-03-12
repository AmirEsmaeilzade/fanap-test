import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../../components/layout";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
