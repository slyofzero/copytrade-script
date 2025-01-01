declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      FIREBASE_KEY: string | undefined;
      ETHERSCAN_API_KEY: string | undefined;
      FIREBASE_KEY: string | undefined;
      PORT: string | undefined;
    }
  }
}

export {};
