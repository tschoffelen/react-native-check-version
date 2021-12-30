import { PlatformOSType } from "react-native";

export type CheckVersionUpdateType = "major" | "minor" | "patch";

export interface CheckVersionOptions {
  endpoint?: string;
  platform?: PlatformOSType;
  bundleId?: string;
  currentVersion?: string;
  country?: string;
}

export interface CheckVersionResponse {
  version: string;
  released?: Date; // iOS only
  url: string;
  notes?: string; // iOS only
  needsUpdate: boolean;
  updateType?: CheckVersionUpdateType;
  platform?: PlatformOSType;
  bundleId?: string;
  lastChecked?: string;
  country?: string;
}

declare const checkVersion: (
  options?: CheckVersionOptions
) => Promise<CheckVersionResponse>;
