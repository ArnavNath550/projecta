import { Schema, model, Document } from 'mongoose';

interface IProject extends Document {
    projectId: string;
    projectName: string;
    projectIcon?: string;
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
    projectIcon: {
        type: String,
        required: false
    },
    projectCreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Project = model<IProject>('Project', projectSchema);

export default Project;
