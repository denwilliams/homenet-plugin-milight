const Milight = require('node-milight-promise').MilightController;
const commands = require('node-milight-promise').commands2;

/**
 * Milight Wireless Bridge
 */
export class MilightBridge {
  private bridge;

  constructor(private id: string, host: string) {
    this.bridge = new Milight({
      ip: host,
      delayBetweenCommands: 75,
      commandRepeat: 2
    });
  }

  turnOn(zone: number) : void {
    this.bridge.sendCommands(commands.white.on(zone));
  }

  turnOff(zone: number) : void {
    this.bridge.sendCommands(commands.white.off(zone));
  }
}
