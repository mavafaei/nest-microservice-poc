import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { Idempotency, Payment, User } from "../entities";


export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [
    User,
    Payment,
    Idempotency
    // join(__dirname, "../../**/*entity{.ts,.js}")    
  ],
  synchronize: true,
};