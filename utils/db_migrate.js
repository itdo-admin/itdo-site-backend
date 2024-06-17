/**
 * I am Liyoha
 */

import glob from 'tiny-glob';
import path from 'path';

async function init() {
	const data = await glob(`${path.resolve('./migration/*.sql')}`);
	console.log(data);
}
