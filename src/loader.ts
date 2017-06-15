import {IPluginLoader, ILogger, IConfig, ILightsManager, ISettable, IClassTypeFactory} from '@homenet/core';

import { MilightBridge } from './bridge';
import { MilightLight} from './light';

export function create(annotate): { MilightPluginLoader: new(...args: any[]) => IPluginLoader } {
  @annotate.plugin()
  class MilightPluginLoader implements IPluginLoader {
    private bridges : any;

    constructor(
            @annotate.service('IConfig') private config: IConfig,
            @annotate.service('ILightsManager') private lights: ILightsManager,
            @annotate.service('ILogger') private logger: ILogger) {
      this.bridges = {};
      this.init();

      const lightFactory: IClassTypeFactory<ISettable> = this.lightFactory.bind(this);
      lights.addSettableType('milight', lightFactory);
    }

    load() : void {
      this.logger.info('Loading milight lights');
    }

    private init() : void {
      this.logger.info('Starting Milights');

      const milightConfig = (<any>this.config).milight || {};
      const bridgeConfigs = milightConfig.bridges || [];

      bridgeConfigs.forEach(b => {
        console.log('bridgeConfig', this.bridges);
        this.bridges[b.id] = new MilightBridge(b.id, b.host);
      });
    }

    private lightFactory(id : string, opts : { bridge: string, groupId: number }) : ISettable {
      this.logger.info('Adding Milight light: ' + id);
      const bridge = this.bridges[opts.bridge];
      return new MilightLight(id, opts.groupId, bridge, this.logger);
    }
  }

  return { MilightPluginLoader };
}
