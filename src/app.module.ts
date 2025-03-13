import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig, mongoConfigLoader } from './config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { ResourceGuard, ScopeGuard } from 'guards';
import { ResourceModule } from 'modules/resource/resource.module';
import { UserModule } from 'modules/user/user.module';
import { AuthModule } from 'modules/auth/auth.module';
import { jwtLoader } from 'config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'modules/profile/profile.module';
import { HfModule } from 'modules/llms/hf/hf.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config: MongoConfig = configService.get('database')!;
        return {
          uri: config.uri
        };
      },
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfigLoader, jwtLoader],
      expandVariables: true,
    }),
    JwtModule.register({
      global: true,
    }),

    ResourceModule,
    UserModule,
    AuthModule,
    ProfileModule,
    HfModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ResourceGuard
    },
    {
      provide: APP_GUARD,
      useClass: ScopeGuard
    },
  ]
})
export class AppModule { }
