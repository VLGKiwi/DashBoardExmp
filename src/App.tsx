import Dashboard from './components/Dashboard';
import './index.css';

// Кодовое слово LIQN в футере
function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-gray-100">
      <header className="w-full bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard App</h1>
      </header>

      <main className="flex-grow w-full overflow-hidden">
        <Dashboard />
      </main>

      <footer className="w-full p-2 text-center text-gray-500 text-sm">
        Dashboard App • Code: LIQN
      </footer>
    </div>
  );
}

export default App;
