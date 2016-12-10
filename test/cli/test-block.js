/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const repoPath = require('./index').repoPath
const describeOnlineAndOffline = require('../utils/on-and-off')
const ipfs = require('../utils/ipfs-exec')(repoPath)

describe('block', () => {
  describeOnlineAndOffline(repoPath, () => {
    it('put', () => {
      return ipfs('block put test/test-data/hello').then((out) => {
        expect(out).to.be.eql(
          'QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp'
        )
      })
    })

    it('put with flags, format and mhtype', () => {
      return ipfs('block put --format eth-block --mhtype keccak-256 test/test-data/eth-block').then((out) => {
        expect(out).to.be.eql(
          'z43AaGF4V81rH6y9ykccadnaGV7EkvbPhFXuvrP6mpK89r8bR5T'
        )
      })
    })

    it('get', () => {
      return ipfs('block get QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp').then((out) => {
        expect(out).to.be.eql('hello world\n')
      })
    })

    it('stat', () => {
      return ipfs('block stat QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp').then((out) => {
        expect(out).to.be.eql([
          'Key: QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp',
          'Size: 12'
        ].join('\n'))
      })
    })

    it.skip('rm', () => {
      return ipfs('block rm QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp').then((out) => {
        expect(out).to.be.eql(
          'removed QmZjTnYw2TFhn9Nn7tjmPSoTBoY7YRkwPzwSrSbabY24Kp'
        )
      })
    })
  })
})
