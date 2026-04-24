import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ManageAnimals = lazy(() => import('./pages/admin/ManageAnimals'));
const ManageStaff = lazy(() => import('./pages/admin/ManageStaff'));
const FinancialReports = lazy(() => import('./pages/admin/FinancialReports'));
const ZookeeperDashboard = lazy(() => import('./pages/ZookeeperDashboard'));
const FeedingSchedules = lazy(() => import('./pages/zookeeper/FeedingSchedules'));
const HealthRecords = lazy(() => import('./pages/zookeeper/HealthRecords'));
const VisitorDashboard = lazy(() => import('./pages/VisitorDashboard'));
const ExploreAnimals = lazy(() => import('./pages/visitor/ExploreAnimals'));
const BookTickets = lazy(() => import('./pages/visitor/BookTickets'));
const UpcomingEvents = lazy(() => import('./pages/visitor/UpcomingEvents'));
const ZooMap = lazy(() => import('./pages/visitor/ZooMap'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const Sidebar = lazy(() => import('./components/Sidebar'));

// Loading spinner component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: '#0f172a',
    color: '#3b82f6'
  }}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><Sidebar><AdminDashboard /></Sidebar></PrivateRoute>} />
          <Route path="/admin/animals" element={<PrivateRoute roles={['ADMIN']}><Sidebar><ManageAnimals /></Sidebar></PrivateRoute>} />
          <Route path="/admin/staff" element={<PrivateRoute roles={['ADMIN']}><Sidebar><ManageStaff /></Sidebar></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute roles={['ADMIN']}><Sidebar><FinancialReports /></Sidebar></PrivateRoute>} />
  
          {/* Zookeeper Routes */}
          <Route path="/zookeeper" element={<PrivateRoute roles={['ZOOKEEPER']}><Sidebar><ZookeeperDashboard /></Sidebar></PrivateRoute>} />
          <Route path="/zookeeper/schedules" element={<PrivateRoute roles={['ZOOKEEPER']}><Sidebar><FeedingSchedules /></Sidebar></PrivateRoute>} />
          <Route path="/zookeeper/records" element={<PrivateRoute roles={['ZOOKEEPER']}><Sidebar><HealthRecords /></Sidebar></PrivateRoute>} />
  
          {/* Visitor Routes */}
          <Route path="/visitor" element={<PrivateRoute roles={['VISITOR']}><Sidebar><VisitorDashboard /></Sidebar></PrivateRoute>} />
          <Route path="/visitor/animals" element={<PrivateRoute roles={['VISITOR']}><Sidebar><ExploreAnimals /></Sidebar></PrivateRoute>} />
          <Route path="/visitor/book" element={<PrivateRoute roles={['VISITOR']}><Sidebar><BookTickets /></Sidebar></PrivateRoute>} />
          <Route path="/visitor/events" element={<PrivateRoute roles={['VISITOR']}><Sidebar><UpcomingEvents /></Sidebar></PrivateRoute>} />
          <Route path="/visitor/map" element={<PrivateRoute roles={['VISITOR']}><Sidebar><ZooMap /></Sidebar></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
