import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig, mongoConfigLoader } from './config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'modules/user/user.module';
import { AuthModule } from 'modules/auth/auth.module';
import { jwtLoader } from 'config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'modules/profile/profile.module';
import { HfModule } from 'modules/llms/hf/hf.module';
import { GptModule } from 'modules/llms/gpt/gpt.module';
import { OrganizationModule } from 'modules/organization/organization.module';
import { PermissionModule } from 'modules/permission/permission.module';
import { AuthGuard } from 'guards/auth';
import { RoleModule } from 'modules/role/role.module';
import { PromptModule } from 'modules/prompt/prompt.module';
import { VisibilityModule } from 'modules/visibility/visibility.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { llmLoader } from 'config/llm.config';

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
      load: [mongoConfigLoader, jwtLoader, llmLoader],
      expandVariables: true,
    }),
    JwtModule.register({
      global: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),

    OrganizationModule,
    PromptModule,
    UserModule,
    AuthModule,
    ProfileModule,
    HfModule,
    GptModule,
    PermissionModule,
    RoleModule,
    // ExampleModule,
    VisibilityModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
