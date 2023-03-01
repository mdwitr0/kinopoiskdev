/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = process.env.NODE_ENV === 'production' ? 5 : 1;

@Injectable()
export class AppClusterService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
