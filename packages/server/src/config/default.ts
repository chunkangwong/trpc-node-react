import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const customConfig: {
  port: number;
  origin: string;
} = {
  port: 8000,
  origin: process.env.ORIGIN as unknown as string,
};

export default customConfig;
