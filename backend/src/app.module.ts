import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:LVmbOrbxvhHYb45y@clustertasksapp.spzuc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTasksApp',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
