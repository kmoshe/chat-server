const Namespace = require("../models/Namespace");
const Namespaces = require("../models/Namespaces");
const Room = require("../models/Room");

module.exports = (doctorNamespace,socket, namespaces, clientType, doctor, patientId) => {

    var appointmentId = '';
    {//on doctor connect
        const namespace = new Namespace(doctor.id, doctor, `${doctor.firstName} ${doctor.lastName}`, '', '');
        console.log('doctor connect');
        namespaces.setNamespace(doctor.id, namespace);
        console.log(appointmentId);
        socket.broadcast.emit('doctor_connected', doctor);
    }

    socket.on('switch_room',function(newRoom){
        console.log(`switch room event from ${appointmentId} to ${newRoom}`);

        if(typeof appointmentId !== 'undefined' && appointmentId !== ''){
            socket.leave(appointmentId);
        }
        appointmentId = newRoom;
        socket.join(appointmentId);

        socket.to(appointmentId).emit('doctor_in_room',doctor);

    })

    socket.on('disconnect', function () {
        console.log('Doctor Disconnected');
        socket.broadcast.emit('doctor_disconnected', doctor);
    });




    socket.on('chat_message',function(roomMessage){

        console.log('doctor chat message');
        doctorNamespace.to(appointmentId).emit('chat_message',roomMessage);

    })

    socket.on('received',function(messageId){

        console.log('message recieved by doctor');
        socket.to(appointmentId).emit('received',messageId);

    })

    // socket.on('doctor_connect', function (appointmentId) {// should be in a function , not event , only the new doctor should know that
    //     //the below line is marked, doctor can only join rooms
    //     //namespace.addRoom(new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, null, true));
    //     socket.join(appointmentId);
    //     socket.in(appointmentId).emit('doctor_connected', 'רופא מחובר');
    // });


    // socket.on('patient_message', function (roomMessage) {
    //     const room = this.namespaces.getNamespace(doctorId).getRoom(roomMessage.roomId);
    //     room.addMessage(roomMessage.roomId);
    //     socket.in(roomMessage.roomId).emit('patient_message_received');
    //     socket.in(roomMessage.roomId).emit('patient_message_read');
    // });

    // socket.on('patient_connected', function () {
    //     const room = new Room(appointmentId, `${doctor.firstName} ${doctor.lastName}`, doctor, )
    //     socket.join(appointmentId);
    //     socket.in(appointmentId).emit('patient_connected', 'מבוטח מחובר');
    // });
};



