const axios = require('axios');

const getMessages = async (appointmentId) => {
    const response = await axios.get(`http://localhost:4000/messages?appointmentId=${appointmentId}`) ;
    const data = await response.data;
    return data || {};
}

const getAppointments = async (id, facility, role) => {
    const response = await axios.get(`http://localhost:4000/appointments/`);
    const data = await response.data;
    return data || {}
}

const getDoctorAppointments = async (id, facilityId, role) => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/appointments?doctorId=${id}&facilityId=${facilityId}&role=${role}`);
        data = response.data;
    }
    catch(error) {
        data = error;
    }
    return data;
}

const getAppointment = async (id)  => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/appointments?id=${id}`);
        data = response.data;
    }
    catch (error) {
        data = error;
    }
    return data;
}

const getPatientAppointment = async (id) => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/appointments?patient.id=${id}`);
        data = response.data;
    }
    catch (error) {
        data = error;
    }
    return data;
}


const getDoctorDetails = async (id, facilityId, role) => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/doctors?id=${id}&facilityId=${facilityId}&role=${role}`);
        data = response.data;
    }
    catch (error) {
        data = error;
    }
    return data;
}

const getDoctorDetailsById = async (id) => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/doctors?id=${id}`);
        data = response.data;
    }
    catch (error) {
        data = error;
    }
    return data;
}

const getPatientDetails = async (id) => {
    let data = {};
    try {
        const response = await axios.get(`http://localhost:4000/patients?id=${id}`);
        data = response.data;
    }
    catch (error) {
        data = error;
    }
    return data;
}

const connectToDoctor = async (appointmentId) => {
    const response = await axios.get(`http://localhost:3000/`);
}

module.exports = {
    getAppointments,
    getDoctorAppointments,
    getPatientAppointment,
    getDoctorDetails,
    getPatientDetails,
    getAppointment,
    getDoctorDetailsById
}

