import {plugin, service, IPluginLoader, ILogger, IConfig, ILightsManager, ILight, ILightFactory} from 'homenet-core';


import { MilightBridge } from './bridge';
import { MilightLight} from './light';

@plugin()
export class MilightPluginLoader implements IPluginLoader {

  private _logger : ILogger;
  private _config : IConfig;
  private _lights : ILightsManager;
  private _bridges : any;

  constructor(
          @service('IConfig') config: IConfig,
          @service('ILightsManager') lights: ILightsManager,
          @service('ILogger') logger: ILogger) {
    this._logger = logger;
    this._lights = lights;
    this._logger = logger;
    this._config = config;

    this._bridges = {};
    
    this._init();

    let lightFactory: ILightFactory;
    lightFactory = this._lightFactory.bind(this);
    lights.addType('milight', lightFactory);
  }

  load() : void {
    this._logger.info('Loading milight lights');
  }

  _init() : void {
    this._logger.info('Starting Milights');

    const milightConfig = (<any>this._config).milight || {};
    const bridgeConfigs = milightConfig.bridges || [];

    bridgeConfigs.forEach(b => {
      console.log('bridgeConfig', this._bridges);
      this._bridges[b.id] = new MilightBridge(b.id, b.host);
    });
  }

  _lightFactory(id : string, opts : any) : ILight {
    this._logger.info('Adding Milight light: ' + id);
    const bridge = this._bridges[opts.bridge];
    return new MilightLight(id, opts.zoneId, bridge, this._logger);
  }
}
