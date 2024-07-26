declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
        readonly REACT_APP_API: string;
    }
}

declare module "*.svg";
declare module "*.jpg";
declare module "*.png";
declare module "*.jfif";
