import { versionCompare } from "../backend/api/version";

describe('Version compare', () => {
  it('deals with real semvers', () => {
    expect(versionCompare('1.1.2', '1.1.3')).toEqual({
      needsUpdate: true,
      updateType: 'patch'
    });
    expect(versionCompare('1.1.2', '1.1.2')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('1.2.0', '1.1.3')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('1.1.1', '1.2.0')).toEqual({
      needsUpdate: true,
      updateType: 'minor'
    });
    expect(versionCompare('0.9.0', '1.2.0')).toEqual({
      needsUpdate: true,
      updateType: 'major'
    });
  });

  it('deals with simple decimal versions', () => {
    expect(versionCompare('1.1', '1.2')).toEqual({
      needsUpdate: true,
      updateType: 'minor'
    });
    expect(versionCompare('1.1', '1.1')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('1.2', '1.1')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('0.9', '1.2')).toEqual({
      needsUpdate: true,
      updateType: 'major'
    });
  });

  it('deals with single-number versions', () => {
    expect(versionCompare('11', '12')).toEqual({
      needsUpdate: true,
      updateType: 'major'
    });
    expect(versionCompare('11', '11')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('12', '11')).toEqual({
      needsUpdate: false,
      updateType: null
    });
    expect(versionCompare('9', '12')).toEqual({
      needsUpdate: true,
      updateType: 'major'
    });
    expect(versionCompare('944', '1201')).toEqual({
      needsUpdate: true,
      updateType: 'major'
    });
  });
});
