import { Test, TestingModule } from '@nestjs/testing';
import { DesktopController } from './desktop.controller';

describe('DesktopController', () => {
  let controller: DesktopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesktopController],
    }).compile();

    controller = module.get<DesktopController>(DesktopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
