import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button onClick={() => console.log("Clicked")}>Home</Button>
      <Button onClick={() => console.log("Clicked")}>Works</Button>
      <Button onClick={() => console.log("Clicked")}>Clients</Button>
    </div>
  );
}

export default App;
