"use client";

import React, { SVGProps } from "react";
import {
  React as ReactIcon,
  Nextdotjs as NextIcon,
  Vue as VueIcon,
  Tailwindcss as TailwindIcon,
  TypeScript as TypeScriptIcon,
  Framer as FramerIcon,
  Astro as AstroIcon,
  Node as NodeIcon,
  Nestjs as NestIcon,
  Fastapi as FastAPIIcon,
  Django as DjangoIcon,
  Graphql as GraphQLIcon,
  Express as ExpressIcon,
  Flutter as FlutterIcon,
  Expo as ExpoIcon,
  Postgresql as PostgreSQLIcon,
  Mongodb as MongoDBIcon,
  Redis as RedisIcon,
  Prisma as PrismaIcon,
  Supabase as SupabaseIcon,
  Docker as DockerIcon,
  Github as GitHubIcon,
  Vercel as VercelIcon,
  Render as RenderIcon,
  Aws as AWSIcon,
} from "@thesvg/react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const ICON_MAP: Record<string, IconComponent> = {
  react: ReactIcon,
  "next.js": NextIcon,
  nextjs: NextIcon,
  vue: VueIcon,
  "vue.js": VueIcon,
  tailwindcss: TailwindIcon,
  tailwind: TailwindIcon,
  typescript: TypeScriptIcon,
  "framer motion": FramerIcon,
  framer: FramerIcon,
  astro: AstroIcon,
  node: NodeIcon,
  "node.js": NodeIcon,
  nest: NestIcon,
  nestjs: NestIcon,
  fastapi: FastAPIIcon,
  django: DjangoIcon,
  graphql: GraphQLIcon,
  express: ExpressIcon,
  flutter: FlutterIcon,
  expo: ExpoIcon,
  postgresql: PostgreSQLIcon,
  postgres: PostgreSQLIcon,
  mongodb: MongoDBIcon,
  mongo: MongoDBIcon,
  redis: RedisIcon,
  prisma: PrismaIcon,
  supabase: SupabaseIcon,
  docker: DockerIcon,
  "github actions": GitHubIcon,
  vercel: VercelIcon,
  render: RenderIcon,
  aws: AWSIcon,
};

interface TechIconProps {
  name: string;
  logo?: string | null;
  className?: string;
}

export function TechIcon({ name, logo, className = "w-5 h-5" }: TechIconProps) {
  const IconComponent = ICON_MAP[name.toLowerCase()];

  if (logo) {
    return <img src={logo} alt={name} className={className} />;
  }

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return (
    <div className={`bg-muted rounded flex items-center justify-center ${className}`}>
      <span className="text-[8px]">{name.slice(0, 2).toUpperCase()}</span>
    </div>
  );
}