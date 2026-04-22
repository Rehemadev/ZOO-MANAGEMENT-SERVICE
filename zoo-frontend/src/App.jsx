import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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
import UpcomingEvents from './pages/visitor/UpcomingEvents';
import ZooMap from './pages/visitor/ZooMap';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Placeholder from './pages/Placeholder';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
