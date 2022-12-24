import { Amplify, API } from "aws-amplify";

import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);

export const queryBackend = async (
  endpoint: string,
  data: Record<string, Record<string, string | null>>,
) => {
  return API.post("backend", endpoint, data);
};
