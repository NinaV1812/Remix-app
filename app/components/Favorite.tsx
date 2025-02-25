import { useFetcher } from "@remix-run/react";
import type { ContactType } from "../data";

type FavoriteProps = {
  contact: Pick<ContactType, "favorite">;
};

export const Favorite = ({ contact }: FavoriteProps) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";
  const favorite: boolean = contact.favorite ?? false;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
       disabled={isSubmitting}
      >
        {isSubmitting ? "⏳" : favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
