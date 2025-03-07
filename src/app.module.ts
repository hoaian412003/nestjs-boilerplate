import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig, mongoConfigLoader } from './config/database.config';
import { ExampleModule } from 'modules/example/example.module';
import { APP_GUARD } from '@nestjs/core';
import { ResourceGuard, ScopeGuard } from 'guards';

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
      load: [mongoConfigLoader],
      expandVariables: true,
    }),

    ExampleModule,
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
    }
  ]
})
export class AppModule { }
