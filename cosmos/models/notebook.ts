import {DATABASE_ID, NOTEBOOKS_CONTAINER} from "@/cosmos/constants";
import {Notebook, NotebookInput} from "@/types/Notebook";
import Model from "@/cosmos/models/model";

const partitionKey = undefined; // Define an appropriate partition key based on your data model

class NotebookModel extends Model<NotebookInput, Notebook> {
    constructor() {
        super(DATABASE_ID, NOTEBOOKS_CONTAINER, partitionKey);
    }
}

const notebookModel = new NotebookModel();

export default notebookModel;
