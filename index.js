// Setup basic express server
import {getAppointment, getDoctorAppointments, getDoctorDetails, getPatientDetails} from "./services/api.service";

const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const monitorio = require('monitor.io');
const redis = require('socket.io-redis');
const port = process.env.PORT || 3030;
const serverName = process.env.NAME || 'Unknown';
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');


//io.use(monitorio({port: 8000}));

app.use(bodyParser.json({limit: '1mb'}));
//io.adapter(redis({ host: 'redis', prot: 6379 }));
app.use(cors())

var namespaces = {};

app.get('/api/patients', async (req, res) => {
    const data = await getPatientDetails(req.params.id);
    res.send(data || {});
});

app.get('/api/appointment', async (req, res) => {
    const data = await getAppointment(req.params.id);
    res.send(data || {});
});

app.get('/api/appointments/patient', async (req, res) => {
    const data = await getAppointment(req.params.id);
    const patient = data.patient;
    res.send(patient || {});
});

app.get('/api/appointments/doctor', async (req, res) => {
    const data = await getDoctorAppointments(req.query.id, req.query.facilityId, req.query.role);
    res.send(data || {});
});

app.get('/api/doctors', async (req, res) => {
    const data = await getDoctorDetails(req.query.id, req.query.facilityId, req.role);
    res.send(data || {});
});

io.sockets.on('connection', function(socket) {
    const clientType = socket.handshake.query['clientType'];
    const appointmentId = socket.handshake.query['appointmentId'];
    const doctorId = socket.handshake.query['doctorId'];
    let nsDoctor = doctorId;
    if (typeof appointmentId === 'undefined') {
        const appoinement = getAppointment(appointmentId);
        nsDoctor = appoinement.doctorId;
    }

    io.of(nsDoctor).on('connection', function(socket) {

        socket.on('disconnect', function () {
            console.log('Disconnected');
        });

        socket.on('patient_connect', function (appointmentId) {
            socket.join(appointmentId);
            socket.in(appointmentId).emit('patient_connected', 'מבוטח מחובר');
        });

        socket.on('chat_message', function (appointmentId, msg) {
            if (msg.hasOwnProperty('destination')) {
                socket.to(msg.destination).emit('chat_message', msg);
            } else {
                socket.in(appointmentId).emit('chat_message', msg);
            }
        });
    });
});

http.listen(port, function () {
    console.log(`Server listens on ${port}`);
});

