const Namespace = require("../models/Namespace");
const Namespaces = require("../models/Namespaces");
const Room = require("../models/Room");

module.exports = (doctorNamespace,socket, namespaces, clientType, appointmentId, doctor, patientId) => {

    {// on patient connect
        const namespace = new Namespace(doctor.id, doctor, `${doctor.firstName} ${doctor.lastName}`, '', '');
        namespaces.setNamespace(doctor.id, namespace);

        console.log(doctor);
        namespace.addRoom(new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor.id, doctor, true));
        socket.join(appointmentId);
        socket.broadcast.emit('patient_connected', {"patientId": patientId, "appointmentId": appointmentId});
        // socket.in(appointmentId).emit('patient_connected', 'מבוטח מחובר');
    }

    socket.on('disconnect', function () {
        console.log('Patient Disconnected');
        //update data structure
        console.log(patientId);
        socket.broadcast.emit('patient_disconnected', {"patientId": patientId, "appointmentId": appointmentId});
    });

    socket.on('patient_disconnect', function (data) {

        socket.leave(data.appointmentId)
        socket.emit('patient_disconnected', "מבוטח התנתק מהצ'אט");
    });

    socket.on('chat_message',function(roomMessage){
        console.log(`patient chat message to room ${roomMessage.roomId}`);
        doctorNamespace.to(appointmentId).emit('chat_message',roomMessage);

    })

    socket.on('received',function(messageId){

        console.log('message recieved by patient');
        socket.to(appointmentId).emit('received',messageId);

    })

    // socket.on('doctor_message', function (roomMessage) {
    //     const room = this.namespaces.getNamespace(doctor.id).getRoom(roomMessage.roomId);
    //     room.addMessage(roomMessage.roomId);
    //     socket.in(roomMessage.roomId).emit('doctor_message_received');
    //     socket.in(roomMessage.roomId).emit('doctor_message_read');
    // });

    // socket.on('patient_connect', function (data) {//should be in a function , not event , only the new patient should know that

    //     namespace.addRoom(new Room(data.appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor.id, doctor, true));
    //     namespace.addRoom(new Room(data.appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor.id, doctor, true));
    //     socket.join(data.appointmentId);
    //     socket.in(data.appointmentId).emit('patient_connected', 'מבוטח מחובר');
    // });

    // socket.on('doctor_connected', function () {

    //     const room = new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, )
    //     socket.join(appointmentId);
    //     socket.to(appointmentId).emit('patient_connected', 'מבוטח מחובר');
    // });

}

