import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CheckerApproval from './pages/CheckerApproval';
import ServicePOProcessing from './pages/ServicePOProcessing';
import InvoiceCapture from './pages/InvoiceCapture';
import AutoParkValidation from './pages/AutoParkValidation';
import InvoicePosting from './pages/InvoicePosting';
import POVerification from './pages/POVerification';
import RetentionCalculator from './pages/RetentionCalculator';
import FinalReview from './pages/FinalReview';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="main-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/approval/:id" element={<CheckerApproval />} />
              <Route path="/document/:id" element={<ServicePOProcessing />} />
              <Route path="/capture/:id" element={<InvoiceCapture />} />
              <Route path="/validation/:id" element={<AutoParkValidation />} />
              <Route path="/posting/:id" element={<InvoicePosting />} />
              <Route path="/po-verify/:id" element={<POVerification />} />
              <Route path="/retention/:id" element={<RetentionCalculator />} />
              <Route path="/review/:id" element={<FinalReview />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
