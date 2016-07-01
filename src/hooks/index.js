// Add any common hooks you want to share across services in here.
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.
import * as log from 'logstar'

exports.myHook = function myHook(options) {
  return function handle(hook) {
    log.info('My custom global hook ran. Feathers is awesome! ', options, hook);
  };
};
