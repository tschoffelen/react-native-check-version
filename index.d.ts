import {PlatformOSType} from 'react-native';

export type CheckVersionUpdateType = 'major' | 'minor' | 'patch';

export interface CheckVersionOptions {
    endpoint?: string;
    platform?: PlatformOSType;
    bundleId?: string;
    currentVersion?: string;
}

export interface CheckVersionResponse {
    version: string;
    released?: Date; // iOS only
    url: string;
    notes?: string; // iOS only
    needsUpdate: boolean;
    updateType: CheckVersionUpdateType;
}

declare const checkVersion: (options?: CheckVersionOptions) => Promise<CheckVersionResponse>;
