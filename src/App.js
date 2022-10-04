import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <Link to="/AddProduct"></Link> */}
        <Router>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/addproduct" element={<AddProduct />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  )
}

export default App
