import {plugin, service, IPluginLoader, ILogger, IConfig, ILightsManager, ILightSwitch, ILightSwitchFactory} from 'homenet-core';


import { MilightBridge } from './bridge';
import { MilightLight} from './light';

@plugin()
export class MilightPluginLoader implements IPluginLoader {
  private bridges : any;

  constructor(
          @service('IConfig') private config: IConfig,
          @service('ILightsManager') private lights: ILightsManager,
          @service('ILogger') private logger: ILogger) {
    this.bridges = {};
    this.init();

    const lightFactory: ILightSwitchFactory = this.lightFactory.bind(this);
    lights.addType('milight', lightFactory);
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

  private lightFactory(id : string, opts : any) : ILightSwitch {
    this.logger.info('Adding Milight light: ' + id);
    const bridge = this.bridges[opts.bridge];
    return new MilightLight(id, opts.zoneId, bridge, this.logger);
  }
}
