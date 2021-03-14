import { useSession } from "./sessionContext";

function App() {
  const { user, login } = useSession();

  return (
      <div>
        <button onClick={login}>login</button>
        User: {user?.name}
      </div>
  );
}

export default App;