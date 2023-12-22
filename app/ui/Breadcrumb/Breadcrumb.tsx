import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {pathNames?.map((title, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isActive = index === pathNames.length - 1;
          return (
            <Link
              key={title + index}
              style={{
                display: "flex",
                alignItems: "center",
                color: isActive ? "pwc.primary.contrastText" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "none" : "ActiveBorder",
              }}
              href={href}
            >
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
