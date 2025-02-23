import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { createEmptyContact, getContacts, ContactType } from "./data";
import { json, redirect } from "@remix-run/node";

import appStylesHref from "./app.css?url";
import { useEffect, useState, FormEvent } from "react";
import NavLinkComponent from "./components/NavLinkComponent";
import SearchForm from "./components/SearchForm";
import { ButtonForm } from "./components/ButtonForm";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact?._id}/edit`);
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  const navigation = useNavigation();
  const { contacts, q } = useLoaderData<typeof loader>();
  const [query, setQuery] = useState(q || "");
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    setQuery(q || "");
  }, [q]);
  const onFormChange = (event: FormEvent<HTMLFormElement>) => {
    const isFirstSearch = q === null;
    submit(event.currentTarget, {
      replace: !isFirstSearch,
    });
  };

  const getDetailsClass =
    navigation.state === "loading" && !searching ? "loading" : "";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <SearchForm
              query={query}
              setQuery={setQuery}
              searching={searching}
              onFormChange={onFormChange}
            />
            <ButtonForm
              method="post"
              buttonType="submit"
              buttonText={"New"}
              id="create-new-contact"
            />
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact: ContactType) => (
                  <li key={contact._id}>
                    <NavLinkComponent
                      navigationDestination={`contacts/${contact._id}`}
                      contact={contact}
                      isContactFavorite={contact?.favorite}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div className={getDetailsClass} id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
