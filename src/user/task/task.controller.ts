import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
@Controller('users/:id_user/tasks')
export class TaskController {

    constructor(private taskService: TaskService) {
    };

    @Post()
    createTask(@Param('id_user') idUser: number, @Body() createTaskDto: CreateTaskDto) {
        createTaskDto.userId = idUser;
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    findTasks(@Param('id_user', ParseIntPipe) userId: number) {
        return this.taskService.findTasks(userId);
    }

    @Put(":id")
    updateUser(@Body() updateTaskDto: UpdateTaskDto, @Param("id") id: number) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(":id")
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTask(id);
    }
}