import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/configuration';
import { CommonModule } from '@common/common.module';
import { configurationSchema } from '@config/configuration-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationSchema,
      isGlobal: true,
    }),
    CommonModule,
  ],
})
export class AppModule {}
