import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {

    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) { }

    async createTask(createTaskDto: CreateTaskDto) {
        const task = await this.taskModel.findOne({
            where: { description: createTaskDto.description, userId: createTaskDto.userId },
        });

        if (task) {
            throw new ConflictException("Tarefa já foi cadastrada para este usuário");
        }

        return this.taskModel.create(createTaskDto);
    }

    findTasks(userId: number): Promise<Task[]> {
        const where: any = {}
        where.userId = userId;
        return this.taskModel.findAll({ where });
    }

    updateTask(id: number, updateTaskDto: UpdateTaskDto) {
        return this.taskModel.update(updateTaskDto, { where: { id: id } })
    }

    deleteTask(id: number) {
        return this.taskModel.destroy({ where: { id } });
    }
}