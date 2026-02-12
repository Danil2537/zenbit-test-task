import { Injectable } from '@nestjs/common';
import { Building } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBuildingDTO } from './DTO/createBuilding.dto';

@Injectable()
export class BuildingService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<Building[]> {
    return await this.prisma.building.findMany();
  }

  async create(createBuildingDto: CreateBuildingDTO): Promise<Building> {
    return this.prisma.building.create({ data: createBuildingDto });
  }
}
