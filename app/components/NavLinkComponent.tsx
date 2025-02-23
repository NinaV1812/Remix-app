import { NavLink } from "@remix-run/react";
import { ReactNode } from "react";

type NavLinknComponentProps = {
  navigationDestination: string;
  contactName: string | ReactNode;
  isContactFavorite?: boolean;
};
const NavLinkComponent = ({
  navigationDestination,
  contactName,
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
      {contactName}
      {isContactFavorite ? <span>★</span> : null}
    </NavLink>
  );
};

export default NavLinkComponent;
