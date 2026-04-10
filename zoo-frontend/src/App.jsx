import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManageAnimals from './pages/admin/ManageAnimals';
import ManageStaff from './pages/admin/ManageStaff';
import FinancialReports from './pages/admin/FinancialReports';
import ZookeeperDashboard from './pages/ZookeeperDashboard';
import FeedingSchedules from './pages/zookeeper/FeedingSchedules';
import HealthRecords from './pages/zookeeper/HealthRecords';
import VisitorDashboard from './pages/VisitorDashboard';
import ExploreAnimals from './pages/visitor/ExploreAnimals';
import BookTickets from './pages/visitor/BookTickets';
import PrivateRoute from './components/PrivateRoute';
import Placeholder from './pages/Placeholder';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute roles={['ADMIN']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/animals" element={<PrivateRoute roles={['ADMIN']}><ManageAnimals /></PrivateRoute>} />
        <Route path="/admin/staff" element={<PrivateRoute roles={['ADMIN']}><ManageStaff /></PrivateRoute>} />
        <Route path="/admin/reports" element={<PrivateRoute roles={['ADMIN']}><FinancialReports /></PrivateRoute>} />

        {/* Zookeeper Routes */}
        <Route path="/zookeeper" element={<PrivateRoute roles={['ZOOKEEPER']}><ZookeeperDashboard /></PrivateRoute>} />
        <Route path="/zookeeper/schedules" element={<PrivateRoute roles={['ZOOKEEPER']}><FeedingSchedules /></PrivateRoute>} />
        <Route path="/zookeeper/records" element={<PrivateRoute roles={['ZOOKEEPER']}><HealthRecords /></PrivateRoute>} />

        {/* Visitor Routes */}
        <Route path="/visitor" element={<PrivateRoute roles={['VISITOR']}><VisitorDashboard /></PrivateRoute>} />
        <Route path="/visitor/animals" element={<PrivateRoute roles={['VISITOR']}><ExploreAnimals /></PrivateRoute>} />
        <Route path="/visitor/book" element={<PrivateRoute roles={['VISITOR']}><BookTickets /></PrivateRoute>} />
        <Route path="/visitor/events" element={<PrivateRoute roles={['VISITOR']}><Placeholder title="Upcoming Shows" /></PrivateRoute>} />
        <Route path="/visitor/map" element={<PrivateRoute roles={['VISITOR']}><Placeholder title="Interactive Zoo Map" /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
