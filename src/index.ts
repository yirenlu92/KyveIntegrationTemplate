import KYVE from '@kyve/core';
import { fetchBlock } from './utils';
import { name, version } from '../package.json';

process.env.KYVE_RUNTIME = name;
process.env.KYVE_VERSION = version;

KYVE.metrics.register.setDefaultLabels({
  app: process.env.KYVE_RUNTIME,
});

class KyveIntegrationTemplate extends KYVE {
  public async getDataItem(key: number): Promise<{ key: number; value: any }> {
    let block;

    try {
      block = await fetchBlock(this.pool.config.rpc, key);
    } catch (err) {
      this.logger.warn(
        `⚠️  EXTERNAL ERROR: Failed to fetch block ${key}. Retrying ...`
      );

      throw err;
    }

    if (!block) throw new Error();

    return { key, value: block };
  }
}

// noinspection JSIgnoredPromiseFromCall
new KyveIntegrationTemplate().start();
