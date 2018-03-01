'use strict';

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
const request = require('request');

let intentMap = {
  'AMAZON.YesIntent': 'YesIntent',
  'AMAZON.NoIntent': 'NoIntent',
};
app.setIntentMap(intentMap);

// Listen for post requests
webhook.listen(8080, function() {
  console.log('Local development server listening on port 8080.');
});

webhook.post('/webhook', function(req, res) {
  reqtest(req);
  app.handleRequest(req, res, handlers);
  app.execute();
  restest(res);
});

// IPL search
app.setHandler({
  'LAUNCH': function() {
      this.toIntent('helloIntent');
  },

  'helloIntent': function() {
      this.ask('Hi! Welcome to IPL Search skill. You can ask me anything related to Indian Premier League.');
  },

  'iplDefinitionIntent': function(name) {
      this.tell('The Indian Premier League (IPL), officially Vivo Indian Premier League for sponsorship reasons, is a professional Twenty20 cricket league in India contested during April and May of every year by teams representing Indian cities.');
  },
});



