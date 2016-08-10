import { plugin, service, ILogger, IConfig, ILightsManager, ILight, ILightFactory } from 'homenet-core';
import { MilightBridge } from './bridge';
import { EventEmitter } from 'events';

export class MilightLight extends EventEmitter implements ILight {
  private _id: string;
  private _zone: number;
  private _bridge: MilightBridge;
  private _logger: ILogger;
  private _state: string;

  constructor(instanceId: string, zoneId: number, bridge: MilightBridge, logger: ILogger) {
    super();
    this._id = instanceId;
    this._zone = zoneId;
    this._bridge = bridge;
    this._logger = logger;
    this._state = 'unknown';
  }

  get() : string {
    return this._state;
  }

  set(value: string|boolean) : void {
    let state: string;
    if (value === false) state = 'off';
    else if (value === true) state = 'full';
    else state = <string> value;

    switch (state) {
      case 'full':
        this._bridge.turnOn(this._zone);
        break;
      case 'off':
        this._bridge.turnOff(this._zone);
        break;
      default:
        return;
    }
    this._state = state;
  }

  turnOn() : void {
    this.set(true);
  }

  turnOff() : void {
    this.set(false);
  }
}
