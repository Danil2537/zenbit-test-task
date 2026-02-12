import { Module } from '@nestjs/common';
import { BucketModule } from './bucket/bucket.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { BuildingModule } from './building/building.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    BucketModule,
    BuildingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
