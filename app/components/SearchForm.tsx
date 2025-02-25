import { Form } from "@remix-run/react";
import { SearchStatus } from "../enums";

type SearchFormProps = {
  query: string;
  setQuery: (value: string) => void;
  searching?: boolean;
  onFormChange: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
  query,
  setQuery,
  searching,
  onFormChange,
}: SearchFormProps) => {
  return (
    <Form id="search-form" role="search" onChange={onFormChange}>
      <div
        id="search-spinner"
        aria-hidden
        hidden={!searching}
        data-testid="search-spinner"
      />

      <input
        id="q"
        aria-label="Search contacts"
        className={searching ? SearchStatus.Loading : SearchStatus.Default}
        placeholder="Search"
        type="search"
        name="q"
        onChange={(event) => setQuery(event.currentTarget.value)}
        value={query}
      />
    </Form>
  );
};

export default SearchForm;
