
var FSM = require('../fsm')
  , it = require('it-is')

exports ['basic'] = function (){
  var s2e1 = false, s2 = false

  var fsm = new FSM({
    s1: {
      e1: 's2' //transition to state 2
    , e2: function (){console.log('event2')}//call func but do not change state
    }
  , s2: {
      _in: function (){
          s2 = true
          console.log('entered state2')
        } //call func when enter state
    , e1: ['s1', function (){
        s2e1 = true
        console.log('event1 in state2')
      }]
    }
  })

  it(fsm.getStates()).deepEqual(['s1','s2'])
  it(fsm.getEvents()).deepEqual(['e1','e2'])

  it(s2).equal(false)
  it(fsm.getState()).equal('s1')
  fsm.event('e1')
  it(fsm.getState()).equal('s2')
  it(s2).equal(true)
  it(s2e1).equal(false)
  fsm.event('e1')
  it(fsm.getState()).equal('s1')
  it(s2e1).ok()
  //e1 then goes back to state 1.
}

exports ['sequence'] = function (){
  var fsm = new FSM({
    s1: {
      e1: 's2' //transition to state 2
    }
  , s2: {
      e1: ['s1', function (){
      }]
    }
  })

  it(fsm.sequence('e1 e2 e1 e2'.split(' ')).getState()).equal('s1')
}
