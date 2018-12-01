const axios = require('axios');
const parse = require('csv-parse/lib/sync')


const alfaCapitalUrls = require('./alfaCapitalUrls');

export default async function getPifGraph({ pifAlias }, done) {
  const response = await axios.get(alfaCapitalUrls.getGrapDataUrl({ pifAlias }));
  const data = parse(response, {
    columns: true,
    delimiter: ';',
    cast: (value, options) => {
      if (options.header) {
        return value
      }
      if (options.column === 'date') {
        return +new Date(`${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`)
      }
      const parsedFloat = value.split('.')
      return parseInt(`${parsedFloat[0]}${parsedFloat[1].padEnd(2, '00')}`);
    },
  })
  done(null, data)
}
