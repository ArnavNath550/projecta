import { Schema, model, Document, trusted } from 'mongoose';

interface IProject extends Document {
    projectId: string;
    projectName: string;
    projectDescription: string;
    projectIcon?: string;
    projectCreator: string;
    projectCreatedAt: Date;
}

const projectSchema = new Schema<IProject>({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectIcon: {
        type: String,
        required: false
    },
    projectCreator: {
        type: String,
        required: true
    },
    projectCreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Project = model<IProject>('Project', projectSchema);

export default Project;
