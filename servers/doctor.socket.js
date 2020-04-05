const Namespace = require("../models/Namespace");
const Namespaces = require("../models/Namespaces");
const Room = require("../models/Room");

module.exports = (socket, namespaces, clientType, appointmentId, doctor, patientId) => {

    const namespace = new Namespace(doctor.id, doctor, `${doctor.firstName} ${doctor.lastName}`, '', '');
    namespaces.setNamespace(nsDoctor, namespace);
    socket.on('disconnect', function () {
        console.log('Disconnected');
    });

    socket.on('doctor_connect', function (appointmentId) {

        namespace.addRoom(new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, null, true));
        socket.join(appointmentId);
        socket.in(appointmentId).emit('doctor_connected', 'רופא מחובר');
    });

    socket.on('patient_connected', function () {
        const room = new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, )
        socket.join(appointmentId);
        socket.in(appointmentId).emit('patient_connected', 'מבוטח מחובר');
    });

    socket.on('patient_message', function (roomMessage) {
        const room = this.namespaces.getNamespace(doctorId).getRoom(roomMessage.roomId);
        room.addMessage(roomMessage.roomId);
        socket.in(roomMessage.roomId).emit('patient_message_received');
        socket.in(roomMessage.roomId).emit('patient_message_read');
    });
};

