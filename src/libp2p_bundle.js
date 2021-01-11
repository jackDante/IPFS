const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const defaultsDeep = require('@nodeutils/defaults-deep')
//our class just adds the libp2p-tcp transport module to the default constructor options of the base class
const Multiplex = require('libp2p-mplex')  //The answer is multiplexing. 
const SECIO = require('libp2p-secio')

/*
we can open multiple independent streams over our single TCP connection, 
and our connection will be upgraded to a securely encrypted channel 
using the secio module.
*/
const DEFAULT_OPTS = {
  modules: {
    transport: [
      TCP
    ],
    connEncryption: [
      SECIO
    ],
    streamMuxer: [
      Multiplex
    ]
  }
}
class P2PNode extends Libp2p {
  constructor (opts) {
    super(defaultsDeep(opts, DEFAULT_OPTS))
  }
}
module.exports = P2PNode

/*
As we know, libp2p was born while working InterPlanetary File System project, 
it makes sense to make our libp2p nodes InterPlanetary:
we have two nodes: moon and earth!

The constructor for our bundle(libp2p_bundle.js) requires a peerInfo argument. 
This can either be generated on-the-fly or loaded from a byte buffer or JSON object. 
Here, we're generating a new PeerInfo object for our peer using ids/moonId.json. 
This will generate a new PeerId containing the cryptographic key pair 
that we added in moonId.json.
*/