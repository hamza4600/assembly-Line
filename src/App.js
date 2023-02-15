import './App.css';
import AssemblyLine from './component/assembly';

function App() {
  return (
    <div className="App">
      <AssemblyLine
        stages={["Idea", "Developmet", "Testing", "Deployment"]}
      />
    </div>
  );
}

export default App;
