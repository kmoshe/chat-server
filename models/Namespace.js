class Namespace {
    constructor(id, doctor, title, image, endpoint){
        this.id = id;
        this.doctor = doctor;
        this.image = image;
        this.title = title;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(room){
        this.rooms[this.id] = (room);
    }

    getRoom(id) {
        return this.rooms[id]
    }
}

module.exports = Namespace;