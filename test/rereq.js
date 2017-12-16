
const rereq = require('../index');
const expect = require('chai').expect;

describe('rerequire', () => {

  let cache = null;

  beforeEach(() => {
    cache = {};
    for(let m in require.cache) {
      cache[m] = require.cache[m];
      delete require.cache[m];
    }
  });

  afterEach(() => {
    for(let m in cache) {
      require.cache[m] = cache[m];
    }
  });

  describe('deep', () => {

    it('Should remove all dependencies of given module', () => {
      let child = require('./etc/child');
      let grandchild = require('./etc/grandchild');

      let oldGrandchild = require('./etc/grandchild');
      let oldChild = require('./etc/child');
      let newChild = rereq('./etc/child');

      expect(oldChild).to.be.equal(child);
      expect(newChild).not.to.be.equal(child);

      let newGrandchild = require('./etc/grandchild');
      expect(oldGrandchild).to.be.equal(grandchild);
      expect(newGrandchild).not.to.be.equal(grandchild);
    });
  });
});