import { skyAnimationEmerge } from './emerge';

describe('Animation emerge', () => {
  it('should define an animation trigger', () => {
    // We type as `any` here to get to internal properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const definitions: any = skyAnimationEmerge.definitions;
    expect(skyAnimationEmerge.name).toEqual('skyAnimationEmerge');
    expect(definitions[0].name).toEqual('open');
    expect(definitions[1].name).toEqual('closed');
    expect(definitions[2].expr).toEqual('void => *');
    expect(definitions[2].animation[1].timings).toEqual('300ms ease-in-out');
    expect(definitions[3].expr).toEqual('* <=> *');
    expect(definitions[3].animation.timings).toEqual('300ms ease-in-out');
  });
});
