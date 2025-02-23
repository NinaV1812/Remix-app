import { NavLink } from "@remix-run/react";
import { ContactType } from "../data";
import { ContactName } from "../components/ContactName";

type NavLinknComponentProps = {
  navigationDestination: string;
  contact: ContactType;
  isContactFavorite?: boolean;
};
const NavLinkComponent = ({
  navigationDestination,
  contact,
  isContactFavorite,
}: NavLinknComponentProps) => {
  const getNavLinkClass = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => (isActive ? "active" : isPending ? "pending" : "");
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        getNavLinkClass({ isActive, isPending })
      }
      to={navigationDestination}
      style={{ display: "flex", gap: "4px" }}
    >
      <ContactName contact={contact} />
      {isContactFavorite ? <span>★</span> : null}
    </NavLink>
  );
};

export default NavLinkComponent;
