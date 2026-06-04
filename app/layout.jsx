import React from 'react';

export const metadata = {
  title: 'Risely - Gamification Platform',
  description: 'Complete your quests, earn XP, and climb the leaderboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{__html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e8eef5;
            min-height: 100vh;
          }

          html, body, #__next {
            width: 100%;
            height: 100%;
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
