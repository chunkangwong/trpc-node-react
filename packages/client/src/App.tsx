import "./App.css";
import { trpc } from "./trpc";

function App() {
  const hello = trpc.sayHello.useQuery();

  return <main>{JSON.stringify(hello.data, null, 2)}</main>;
}

export default App;
