import { config as dotenv} from "dotenv"
dotenv()
export const config = {
    admin : true,
    database: 'Mongo',
    mongo: {
        ulr: process.env.DB_MONGO_url
    },
    firebase : {
        type: process.env.DB_FIREBASE_type,
        project_id: process.env.DB_FIREBASE_project_id,
        private_key_id: process.env.DB_FIREBASE_private_key_id,
        private_key: process.env.DB_FIREBASE_private_key,
        client_email: process.env.DB_FIREBASE_client_email,
        client_id: process.env.DB_FIREBASE_client_id,
        auth_uri: process.env.DB_FIREBASE_auth_uri,
        token_uri: process.env.DB_FIREBASE_token_uri,
        auth_provider_x509_cert_url: process.env.DB_FIREBASE_auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.DB_FIREBASE_auth_client_x509_cert_url
    }
}
