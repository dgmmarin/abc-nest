import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: process.env.DB_TYPE.toString() as "mysql" | "mariadb",
            host: process.env.DB_HOST.toString(),
            port: parseInt(process.env.DB_PORT.toString()),
            username: process.env.DB_USERNAME.toString(),
            password:  process.env.DB_PASSWORD.toString(),
            database: process.env.DB_DATABASE.toString(),
            entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../src/database/migrations/*{.ts/.js}'],
            migrationsTableName: 'migrations',
            logging: process.env.DB_LOGGING.toString() === 'true' ? true : false,
            synchronize: process.env.DB_SYNC.toString() === 'true' ? true : false,
            migrationsRun: process.env.DB_MIGRATIONS_RUN.toString() === 'true' ? true : false,
            extra: {
                insecureAuth: true,
            },
        };
    },
};