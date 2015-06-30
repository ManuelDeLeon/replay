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
    var that = this;
    var vm = ViewModel.byId("example");
    var array = that.states().array();
    var i = 0;
    var thisInterval = Meteor.setInterval(function() {
      i += 1;
      $( "#slider" ).slider( "option", "value", i );
      var obj = array.shift();
      if (obj) {
        vm.fromJS(obj);
      } else {
        Meteor.clearInterval(thisInterval);
      }
    }, 500);
  },
  reverse: function(){
    var that = this;
    var vm = ViewModel.byId("example");
    var array = that.states().array();
    var i = array.length;
    var thisInterval = Meteor.setInterval(function() {
      i -= 1;
      $( "#slider" ).slider( "option", "value", i );
      var obj = array.pop();
      if (obj) {
        vm.fromJS(obj);
      } else {
        Meteor.clearInterval(thisInterval);
      }
    }, 500);
  },
  recording: null,
  record: function(){
    var that = this;

    var vm = ViewModel.byId("example");
    that.recording(Meteor.setInterval(function() {
      that.states().push(vm.toJS());
    }, 500));

  },
  stop: function(){
    Meteor.clearInterval(this.recording());
    this.recording(null);
    var that = this;
    var vm = ViewModel.byId("example");
    $( "#slider" ).slider({
      min: 1,
      max: this.states().length,
      slide: function( event, ui ) {
        console.log("slide");
        vm.fromJS(that.states()[ui.value - 1]);
      }
    });
  }

});