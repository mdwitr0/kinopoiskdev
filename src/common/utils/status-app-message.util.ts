import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DOC_PATH } from '../../swagger';
import { Logger as NestLogger } from '@nestjs/common';

export const statusAppMessage = async (app: NestFastifyApplication, isSync: boolean) => {
  const { NODE_ENV } = process.env;

  const logger = new NestLogger('Main');

  const appUrl = await app.getUrl();

  logger.log(`

_____/\\\\\\\\\\\\\\\\\\_____/\\\\\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\\\\\_        
 ___/\\\\\\\\\\\\\\\\\\\\\\\\\\__\\/\\\\\\/////////\\\\\\_\\/////\\\\\\///__       
  __/\\\\\\/////////\\\\\\_\\/\\\\\\_______\\/\\\\\\_____\\/\\\\\\_____      
   _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/______\\/\\\\\\_____     
    _\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\/////////________\\/\\\\\\_____    
     _\\/\\\\\\/////////\\\\\\_\\/\\\\\\_________________\\/\\\\\\_____   
      _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\_________________\\/\\\\\\_____  
       _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\______________/\\\\\\\\\\\\\\\\\\\\\\_ 
        _\\///________\\///__\\///______________\\///////////__

🚀 API app is running on: ${appUrl}
🌚 ENV: ${NODE_ENV}, SYNC: ${isSync}
📑 API Documentation is running on: ${appUrl}/${DOC_PATH}
`);
};
