import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./components/pages/DetailPage";
import ListPage from "./components/pages/ListPage";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ProtectedPages from "./components/pages/ProtectedPages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <LoginPage isLogin={ true }/> } />
          <Route path="/register" element={ <LoginPage isLogin={ false }/> } />
          <Route path='*' element={
            <ProtectedPages>
              <Route path="/" element={ <ListPage /> } />
              <Route path="/:id" element={ <DetailPage /> } />
              <Route path="*" element={ <NotFoundPage /> } />
            </ProtectedPages>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
