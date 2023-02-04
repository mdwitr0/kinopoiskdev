import { getValueByPath } from './get-value-by-path.util';

describe('ParseValue', () => {
  describe('parseNestedValue', () => {
    const obj = {
      info: {
        rus: 'Киберпанк: Бегущие по краю',
      },
      genres: [
        {
          name: 'аниме',
        },
        {
          name: 'мультфильм',
        },
        {
          name: 'фантастика',
        },
        {
          name: 'боевик',
        },
      ],
      persons: [
        {
          id: 1874956,
          photo:
            'https://st.kp.yandex.net/images/actor_iphone/iphone360_1874956.jpg',
          name: 'Кэнъитиро Охаси',
          enName: 'Kenichiro Ohashi',
          enProfession: 'actor',
        },
      ],
    };

    it(`should return "${obj.info.rus}" by key "info.rus"`, () => {
      const key = 'info.rus';
      const result = obj.info.rus;

      expect(getValueByPath(key, obj)).toBe(result);
    });

    it(`should return "Кэнъитиро Охаси" by key "persons.0.name"`, () => {
      const key = 'persons.0.name';
      const result = 'Кэнъитиро Охаси';

      expect(getValueByPath(key, obj)).toBe(result);
    });
  });
});
