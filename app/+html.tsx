import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function RootHtml({ children }: PropsWithChildren) {
  return <html lang="de">
    <head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#1E382B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Gipfelt" />
      <link rel="manifest" href="./manifest.json" />
      <link rel="icon" type="image/svg+xml" href="./icon-b-kalkstein.svg" />
      <link rel="apple-touch-icon" sizes="1024x1024" href="./icon-b-kalkstein.png" />
    </head>
    <body>
      <ScrollViewStyleReset />
      {children}
    </body>
  </html>;
}
