const Milight = require('node-milight-promise').MilightController;
const commands = require('node-milight-promise').commands2;

/**
 * Milight Wireless Bridge
 */
export class MilightBridge {
  private _bridge;
  private _id;

  constructor(id: string, host: string) {
    this._id = id;
    this._bridge = new Milight({
      ip: host,
      delayBetweenCommands: 75,
      commandRepeat: 2
    });
  }

  turnOn(zone: number) : void {
    this._bridge.sendCommands(commands.white.on(zone));
  }

  turnOff(zone: number) : void {
    this._bridge.sendCommands(commands.white.off(zone));
  }
}
