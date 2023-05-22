
import pgp from 'pg-promise';
import { postgresUri } from '../config';

const db = pgp()(postgresUri);

export default db;
