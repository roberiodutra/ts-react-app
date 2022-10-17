import { PropsType } from "../types/PropsType";
import { QuestionProvider } from "./providers/QuestionProvider";
import { UserProvider } from "./providers/UserProvider";

const providers = [UserProvider, QuestionProvider];
export default function ContextProvider({ children }: PropsType) {
  return providers.reduceRight(
    (acc, CurrComponent) => <CurrComponent>{acc}</CurrComponent>,
    children
  );
}
