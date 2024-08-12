import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCT_MICRO_SERVICE_HOST: string;
    PRODUCT_MICRO_SERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_MICRO_SERVICE_HOST: joi.string().required(),
    PRODUCT_MICRO_SERVICE_PORT: joi.number().required(),
})
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    PRODUCT_MICRO_SERVICE_HOST: envVars.PRODUCT_MICRO_SERVICE_HOST,
    PRODUCT_MICRO_SERVICE_PORT: envVars.PRODUCT_MICRO_SERVICE_PORT
};
