import api from './api';

export const animalService = {
    getAll: (search) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        return api.get(`/animals?${params.toString()}`).then(res => res.data);
    },
    getById: (id) => api.get(`/animals/${id}`).then(res => res.data),
    create: (data) => api.post('/animals', data).then(res => res.data),
    update: (id, data) => api.put(`/animals/${id}`, data).then(res => res.data),
    delete: (id) => api.delete(`/animals/${id}`).then(res => res.data)
};

export const userService = {
    getAll: () => api.get('/users').then(res => res.data),
    getAllStaff: () => api.get('/users/staff').then(res => res.data),
    delete: (id) => api.delete(`/users/${id}`).then(res => res.data)
};

export const healthRecordService = {
    getAll: () => api.get('/health-records').then(res => res.data),
    getByAnimal: (animalId) => api.get(`/health-records/animal/${animalId}`).then(res => res.data),
    create: (data) => api.post('/health-records', data).then(res => res.data),
    update: (id, data) => api.put(`/health-records/${id}`, data).then(res => res.data),
    delete: (id) => api.delete(`/health-records/${id}`).then(res => res.data)
};

export const feedingScheduleService = {
    getAll: () => api.get('/feeding-schedules').then(res => res.data),
    getByAnimal: (animalId) => api.get(`/feeding-schedules/animal/${animalId}`).then(res => res.data),
    create: (data) => api.post('/feeding-schedules', data).then(res => res.data)
};


export const bookingService = {
    getAll: () => api.get('/bookings').then(res => res.data),
    getMyBookings: () => api.get('/bookings/my').then(res => res.data),
    getUserBookings: (userId) => api.get(`/bookings/user/${userId}`).then(res => res.data),
    create: (data) => api.post('/bookings', data).then(res => res.data)
};

export const paymentService = {
    getAll: () => api.get('/payments').then(res => res.data),
    process: (data) => api.post('/payments', data).then(res => res.data)
};
