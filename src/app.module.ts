import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig, mongoConfigLoader } from './config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { ResourceModule } from 'modules/resource/resource.module';
import { UserModule } from 'modules/user/user.module';
import { AuthModule } from 'modules/auth/auth.module';
import { jwtLoader } from 'config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from 'modules/profile/profile.module';
import { HfModule } from 'modules/llms/hf/hf.module';
import { GptModule } from 'modules/llms/gpt/gpt.module';
import { OrganizationModule } from 'modules/organization/organization.module';
import { PermissionModule } from 'modules/permission/permission.module';
import { ExampleModule } from 'modules/example/example.module';
import { AuthGuard } from 'guards/auth';
import { RoleModule } from 'modules/role/role.module';
import { Prompt } from 'modules/prompt/prompt.schema';
import { PromptModule } from 'modules/prompt/prompt.module';

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

    OrganizationModule,
    PromptModule,
    UserModule,
    AuthModule,
    ProfileModule,
    HfModule,
    GptModule,
    PermissionModule,
    RoleModule,
    ExampleModule,
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
