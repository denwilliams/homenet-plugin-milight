declare module 'homenet-plugin-milight' {
  import { IPluginLoader } from '@homenet/core';
  export function create(annotate: any): { MilightPluginLoader: new (...args: any[]) => IPluginLoader }
}
