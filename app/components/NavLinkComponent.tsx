import { NavLink } from "@remix-run/react";
import { ContactType } from "../data";
import { ContactName } from "../components/ContactName";
import { NavLinkStatus } from "../enums";

type NavLinkComponentProps = {
  navigationDestination: string;
  contact: ContactType;
  isContactFavorite?: boolean;
};

const NavLinkComponent = ({
  navigationDestination,
  contact,
  isContactFavorite,
}: NavLinkComponentProps) => {
  return (
    <NavLink
      to={navigationDestination}
      className={({ isActive, isPending }) =>
        isActive
          ? NavLinkStatus.Active
          : isPending
          ? NavLinkStatus.Pending
          : NavLinkStatus.Default
      }
    >
      <ContactName contact={contact} />
      {isContactFavorite && <span>★</span>}
    </NavLink>
  );
};

export default NavLinkComponent;
