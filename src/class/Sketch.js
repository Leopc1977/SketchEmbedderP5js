import uuid from '../utils/uuid';

class Sketch {
    constructor(sourceFunction) {

        this.function = sourceFunction;

        this.width = 400;
        this.height = 400;
        this.hasSnippetCode = false;
        this.id = uuid();
    }
}

export default Sketch;
