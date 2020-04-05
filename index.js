// Setup basic express server
const apiService = require("./services/api.service");
const Namespace = require("./models/Namespace");
const Namespaces = require("./models/Namespaces");
const Room = require("./models/Room");
const DoctorSocketServer = require('./servers/doctor.socket');
const PatientSocketServer = require('./servers/patient.socket');

const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const monitorio = require('monitor.io');
const redis = require('socket.io-redis');
const port = process.env.PORT || 3000;
const serverName = process.env.NAME || 'Unknown';
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');


//io.use(monitorio({port: 8000}));

app.use(bodyParser.json({limit: '1mb'}));
//io.adapter(redis({ host: 'redis', prot: 6379 }));
app.use(cors())

const namespaces = new Namespaces();

app.get('/api/patients', async (req, res) => {
    const data = await apiService.getPatientDetails(req.params.id);
    res.send(data || {});
});

app.get('/api/appointment', async (req, res) => {
    const data = await apiService.getAppointment(req.params.id);
    res.send(data || {});
});

app.get('/api/appointments/patient', async (req, res) => {
    const data = await apiService.getAppointment(req.params.id);
    const patient = data.patient;
    res.send(patient || {});
});

app.get('/api/appointments/doctor', async (req, res) => {
    const data = await apiService.getDoctorAppointments(req.query.id, req.query.facilityId, req.query.role);
    res.send(data || {});
});

app.get('/api/doctors', async (req, res) => {
        const data = await apiService.getDoctorDetails(req.query.id, req.query.facilityId, req.role);
        res.send(data || {});
    });

app.get('/api/messages', async (req, res) => {
    const data = await apiService.getMessages(req.query.appointmentId);
    res.send(data || {});
});

app.get('/api/namespace', async (req, res) => {
    io.of(req.params.doctorId);
    res.send('Ok');
});

app.get('/:namespace', function (req, res) {
    const ns = req.params.namespace;

    io.of(ns).on('connection', function(socket) {
        const clientType = socket.handshake.query['clientType'];
        const appointmentId = socket.handshake.query['appointmentId'];
        let doctorId = socket.handshake.query['doctorId'];
        let facilityId = socket.handshake.query['facilityId'];
        let role = socket.handshake.query['role'];
        let patientId = socket.handshake.query['patientId'];
        let nsDoctor = doctorId;
        let appointment = {};

        if (typeof patientId !== 'undefined' && patientId !== '') {
            socket.userId = patientId;
        }

        if (typeof appointmentId !== 'undefined') {
            apiService.getAppointment(appointmentId)
                .then(appointments => {
                    const appointment = appointments[0];
                    return apiService.getDoctorDetails(appointment.doctorId, appointment.facilityId, appointment.role);
                })
                .then(doctors => {
                    const doctor = doctors[0];
                    PatientSocketServer(socket, namespaces, clientType, appointmentId, doctor, patientId);
                });

        }
        else {
            apiService.getDoctorDetailsById(doctorId)
                .then(doctors => {
                    const doctor = doctors[0];
                    DoctorSocketServer(socket, namespaces, clientType, '', doctor, '');
                });
        }
    });
});


http.listen(port, function () {
    console.log(`Server listens on ${port}`);
});

