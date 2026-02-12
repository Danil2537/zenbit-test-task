import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDTO } from './DTO/createBuilding.dto';
import { Building } from '../../generated/prisma/client';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}
  @Get()
  async findAll(): Promise<Building[]> {
    return await this.buildingService.findAll();
  }

  @Post()
  async createBuilding(
    @Body() createBuildingDTO: CreateBuildingDTO,
  ): Promise<Building> {
    return await this.buildingService.create(createBuildingDTO);
  }
}
