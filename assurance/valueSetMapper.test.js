const { mapValueSets } = require('../test/helpers/valueSetMapper');
const exampleValueSet1 = require('./fixtures/valuesets/example-valueset-1.json');
const exampleValueSet2 = require('./fixtures/valuesets/example-valueset-2.json');

describe('valueSetMapper', () => {
  test('valueSetMapper should include all codes', () => {
    const map = mapValueSets([exampleValueSet1, exampleValueSet2]);

    // map should key both URLs
    const vsetUrls = Object.keys(map);
    expect(vsetUrls).toHaveLength(2);
    expect(vsetUrls).toEqual(expect.arrayContaining([exampleValueSet1.url, exampleValueSet2.url]));

    const vs1Entry = map[exampleValueSet1.url];
    const vs1Codes = vs1Entry[exampleValueSet1.version];
    const vs2Entry = map[exampleValueSet2.url];
    const vs2Codes = vs2Entry[exampleValueSet2.version];

    // This entry of the map should contain all codes defined in compose.include
    expect(vs1Codes).toBeDefined();
    expect(vs2Codes).toBeDefined();

    // Check all codes listed
    exampleValueSet1.compose.include.forEach((i) => {
      expect(vs1Codes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            system: i.system,
            version: i.version,
          }),
        ]),
      );

      i.concept.forEach((c) => {
        expect(vs1Codes).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              code: c.code,
              display: c.display,
            }),
          ]),
        );
      });
    });
  });
});
