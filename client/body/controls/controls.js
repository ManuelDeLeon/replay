Template.controls.viewmodel({
  states: [],
  show: false,
  toggle: function() {
    this.show(!this.show());
  },
  onRendered: function() {
    $( "#slider" ).slider();
  },
  play: function(){

  },
  reverse: function(){

  },
  stopRecording: true,
  recordingComputation: null,
  record: function(){
    var that = this;
    if (! that.stopRecording()) {
      that.stopRecording(false);
      var vm = ViewModel.byId("example");
      var c = Tracker.autorun(function () {
        that.states().push(vm.toJS());
      });
      that.recordingComputation(c);
    }
  },
  stop: function(){
    this.stopRecording(true);
    if (this.recordingComputation()){
      this.recordingComputation().stop();
    }
  }

});