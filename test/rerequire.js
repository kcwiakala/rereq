
const rerequire = require('../index');
const expect = require('chai').expect;

function clearCache() {
  for(let m in require.cache) {
    delete require.cache[m];
  }
}

describe('rerequire', () => {

  describe('deep', () => {

    it('Should remove all dependencies of given module', () => {
      let child = require('./etc/child');
      let grandchild = require('./etc/grandchild');

      let oldGrandchild = require('./etc/grandchild');
      let oldChild = require('./etc/child');
      let newChild = rerequire('./etc/child');

      expect(oldChild).to.be.equal(child);
      expect(newChild).not.to.be.equal(child);

      let newGrandchild = require('./etc/grandchild');
      expect(oldGrandchild).to.be.equal(grandchild);
      expect(newGrandchild).not.to.be.equal(grandchild);
    });
  });
});