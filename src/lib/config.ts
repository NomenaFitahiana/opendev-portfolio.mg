import { getServerUrl } from "./getServerUrl";

export const siteConfig = {
  name: "OpenDev Portfolio",
  description:
    "Portfolio professionnel pour OpenDev Madagascar - Plateforme de mise en valeur des projets et du collectif de développeurs.",
  url: getServerUrl(),
  author: "Team Omega",
  links: {
    twitter: "https://x.com/opendev", // mock account - to replace
    github: "https://github.com/OpenDevMada/Opendev-portfolio/",
    docs: "/docs",
  },
} as const;
