import { Injectable } from '@nestjs/common';

const PrismaClientClass = require('../../generated/prisma/client').PrismaClient;

@Injectable()
export class PrismaService extends PrismaClientClass {}
