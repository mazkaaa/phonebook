import { PhonebookProvider } from "./PhonebookProvider";

const ContextProvider = ({ children }: any ) => {
  return <PhonebookProvider>{children}</PhonebookProvider>
}

export default ContextProvider;
