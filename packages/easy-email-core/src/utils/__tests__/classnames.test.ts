import { classnames } from '../classnames';

describe('classnames', () => {
  it('joins only string values with spaces', () => {
    expect(classnames('easy-email', false, 'active', undefined, 0, 'selected')).toBe(
      'easy-email active selected'
    );
  });

  it('returns an empty string when no string values are provided', () => {
    expect(classnames(false, undefined, null, 0)).toBe('');
  });
});
