const Namespace = require("../models/Namespace");
const Namespaces = require("../models/Namespaces");
const Room = require("../models/Room");

module.exports = (socket, namespaces, clientType, appointmentId, doctor, patientId) => {

    console.debug(`doctor.id ${doctor.id}`)
    let namespace = null;
    if (namespaces[doctor.id] === undefined) {
        namespace = new Namespace(doctor.id, doctor, `${doctor.firstName} ${doctor.lastName}`, '', '');
        namespaces.setNamespace(doctor.id, namespace);
    }

    socket.on('disconnect', function () {
        console.log('Disconnected');
    });

    socket.on('patient_connect', function (data) {

        namespace.addRoom(new Room(data.appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor.id, doctor, true));
        socket.join(data.appointmentId);
        socket.in(data.appointmentId).emit('patient_connected', 'מבוטח מחובר');
    });

    socket.on('patient_disconnect', function (data) {

        socket.leave(data.appointmentId)
        const room = namespace.getRoom(data.appointmentId);
        socket.emit('patient_disconnected', 'מבוטח התנתק');
    });

    socket.on('doctor_connected', function () {

        const room = new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, )
        socket.join(appointmentId);
        socket.to(appointmentId).emit('patient_connected', 'מבוטח מחובר');
    });

    socket.on('doctor_message', function (roomMessage) {
        const room = this.namespaces.getNamespace(doctor.id).getRoom(roomMessage.roomId);
        room.addMessage(roomMessage.roomId);
        socket.in(roomMessage.roomId).emit('doctor_message_received');
        socket.in(roomMessage.roomId).emit('doctor_message_read');
    });

}

