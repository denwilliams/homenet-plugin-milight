import { plugin, service, ILogger, IConfig, ILightsManager, ISettable } from 'homenet-core';
import { MilightBridge } from './bridge';
import { EventEmitter } from 'events';

export class MilightLight extends EventEmitter implements ISettable {
  private id: string;
  private state: string;

  constructor(instanceId: string, private zoneId: number, private bridge: MilightBridge, private logger: ILogger) {
    super();
    this.id = instanceId;
    this.state = 'unknown';
  }

  get() : string {
    return this.state;
  }

  set(value: string|boolean) : void {
    let state: string;
    if (value === false) state = 'off';
    else if (value === true) state = 'full';
    else state = <string> value;

    switch (state) {
      case 'full':
        this.bridge.turnOn(this.zoneId);
        break;
      case 'off':
        this.bridge.turnOff(this.zoneId);
        break;
      default:
        return;
    }
    this.state = state;
    this.emit('update', state);
  }
}
