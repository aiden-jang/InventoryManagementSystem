
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Items from './components/Items';
import AddItem from './components/AddItem';
import ViewItem from './components/ViewItem';
import EditItem from './components/EditItem';

export default function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route exact path="/" element={<Items />} />
        <Route exact path="/add" element={<AddItem />} />
        <Route exact path="/items/:itemId" element={<ViewItem />} />
        <Route exact path="/items/:itemId/edit" element={<EditItem />} />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}