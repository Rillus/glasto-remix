import {Links, LiveReload, Outlet, Meta, Link, useLoaderData, NavLink} from "@remix-run/react";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export function meta(): ({ title: string } | { description: string })[] {
  const year = new Date().getFullYear();
  return [
    {
      title: "Glasto " + year
    },
    {
      description: "Your guide to who's playing at the " + year + " Glastonbury Festival.",
    }
  ];
}

export const loader = async ({params}) => {
  console.log(params);
  return {};
};

export default function App() {
  const data = useLoaderData<typeof loader>();

  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className={'dark'}>
        <header className="Header">
          <h3>
            <Link to={'/'}>
              Glasto {year}
            </Link>
          </h3>
          <ul className="Nav">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "isPending" : isActive ? "isActive" : ""
                }
                to={'acts'}
              >
                Acts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "isPending" : isActive ? "isActive" : ""
                }
                to={'stages'}
              >
                Stages
              </NavLink>
            </li>
          </ul>
        </header>
        <section className="Main">
          <Outlet />
        </section>
        <LiveReload />
      </body>
    </html>
  );
}

// export function ErrorBoundary({ error }) {
//   console.log(error);
//   return (
//     <html>
//       <head>
//         <title>Oh no!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {/* add the UI you want your users to see */}
//         {/*<Scripts />*/}
//       </body>
//     </html>
//   );
// }
