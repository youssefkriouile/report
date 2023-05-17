import { Author} from './author.model'
import { Observation } from './observations.model';

export interface Report {
    id?: number; 
    author?: Author;
    productCode?: string;
    observations?: Observation[];
    description?: string;
}

export interface ReportInput {
    report : {
        author?: Author;
        productCode?: string;
        observations?: number[];
        description?: string;
    }
}