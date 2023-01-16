import { BrowserRouter } from "react-router-dom";
import RouterApp from './routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
