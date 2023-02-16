import './App.css';
import AssemblyLineFun from './component/func-assbly';

function App() {
  return (
    <div className="App">
      <AssemblyLineFun
        stages={["Idea", "Developmet", "Testing", "Deployment"]}
      />
    </div>
  );
}

export default App;
