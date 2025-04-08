import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button color="primary" onClick={() => console.log("Clicked")}>
        Home
      </Button>
      <Button color="primary" onClick={() => console.log("Clicked")}>
        Works
      </Button>
      <Button color="primary" onClick={() => console.log("Clicked")}>
        Clients
      </Button>
    </div>
  );
}

export default App;
