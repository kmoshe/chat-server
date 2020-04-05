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
        this.rooms.push(room);
    }
}

export default Namespace;