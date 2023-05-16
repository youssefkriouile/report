import { Author} from './author.model'
import { Observation } from './observations.model';

export interface Report {
    id?: number; 
    author?: Author;
    productCode?: number;
    Observations?: Observation[];
    description?: string;
}