import { Form } from "@remix-run/react";

interface SearchFormProps {
  query: string;
  setQuery: (value: string) => void;
  searching?: boolean;
  onFormChange: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

const SearchForm = ({
  query,
  setQuery,
  searching,
  onFormChange,
}: SearchFormProps) => {
  return (
    <Form id="search-form" role="search" onChange={onFormChange}>
      <input
        id="q"
        aria-label="Search contacts"
        className={searching ? "loading" : ""}
        placeholder="Search"
        type="search"
        name="q"
        onChange={(event) => setQuery(event.currentTarget.value)}
        value={query}
      />
      <div id="search-spinner" aria-hidden hidden={!searching} />
    </Form>
  );
};

export default SearchForm;
