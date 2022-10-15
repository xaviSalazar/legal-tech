import logo from './logo.svg';
import './App.css';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

function App() {
  return (
      <ThemeProvider>
       <Router />
       </ThemeProvider>
  );
}

export default App;
