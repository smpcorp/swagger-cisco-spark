'use strict';

var path = require('path');
var format = require('util').format;
var when = require('when');
var fs = require('fs');
var _ = require('lodash');

var jsonParse = when.lift(JSON.parse);

var sparkDef = '../cisco_spark_v1.json';
var sparkApiBase = 'https://api.ciscosparkcom/v1';

// read file
function getSpec(def) {
  return when.promise((resolve, reject) => {
    fs.readFile(def, 'utf8', function(err, data) {
      if(err) {
        reject(err);
      } else {
        resolve(jsonParse(data));
      }
    });
  });
}

String.prototype.toProper = function() {
  return this[0].toUpperCase() + this.slice(1);
};

var title = '# Cisco Spark Swagger Definition';
var subtitle = 'Swagger Definition for the Cisco Spark API version 1';
var intro = '*Note: This is a generated README file. For details on the data types in the examples, reference [developer.ciscospark.com](https://developer.ciscospark.com).*';
var resources = {};

var processedSpec = getSpec(sparkDef)
  .then(spec => {
    _.forEach(spec.tags, tag => {
      resources[tag.name] = { description: tag.description, methods: {} };
    });
    return when(spec);
  })
  .then(spec => {
    // loop through paths
    _.forEach(_.keys(spec.paths), urlPath => {
      // loop through methods
      _.forEach(_.keys(spec.paths[urlPath]), httpMethod => {
          // loop through httpMethod tags
          _.forEach(spec.paths[urlPath][httpMethod].tags, tag => {
            // if httpMethod tag is one of the globally defined tags...
            if(_.includes(spec.paths[urlPath][httpMethod].tags, tag)) {

              // build example for method
              var example = '';
              if(spec.paths[urlPath][httpMethod].parameters) {
                var body = {};
                var bodyContents = [];
                var root = {};
                var rootContents = [];

                _.forEach(spec.paths[urlPath][httpMethod].parameters, parameter => {
                  if(_.toLower(parameter.in) === 'body' && parameter.schema.properties) {
                    _.forEach(_.keys(parameter.schema.properties), property => {
                      var propType = _.toLower(parameter.schema.properties[property].type);
                      if(propType === 'string') {
                        body[property] = format('"%s string"', property);
                      }

                      else if(propType === 'array') {
                        body[property] = format('["%s string", "%s string"]', property, property);
                      }

                      else if(propType === 'boolean') {
                        body[property] = '"true"';
                      }
                    });
                  }

                  if(_.toLower(parameter.in) === 'query' || _.toLower(parameter.in) === 'path') {
                    var paramType = _.toLower(parameter.type);
                    if(paramType === 'string') {
                      root[parameter.name] = format('"%s string"', parameter.name);
                    }

                    else if(paramType === 'array') {
                      root[parameter.name] = format('["%s string", "%s string"]', parameter.name, parameter.name);
                    }

                    else if(paramType === 'boolean') {
                      root[parameter.name] = '"true"';
                    }
                  }
                });

                if(body != {}) {
                  _.forEach(_.keys(body), property => {
                    bodyContents.push(format('    "%s": %s', property, body[property]));
                  });
                }

                if(root != {}) {
                  _.forEach(_.keys(root), parameter => {
                    rootContents.push(format('  "%s": %s', parameter, root[parameter]));
                  });
                }

                if(bodyContents.length > 0) {
                  example += format('  "body": {\n%s\n  }', bodyContents.join(',\n'));
                }

                if(rootContents.length > 0) {
                  if(bodyContents.length > 0) {
                    example += ',\n';
                  }
                  example += format('%s', rootContents.join(',\n'));
                }

              }

              // add method to resources  object
              resources[tag].methods[spec.paths[urlPath][httpMethod].operationId] = {
                url: sparkApiBase + urlPath,
                httpMethod: httpMethod,
                description: spec.paths[urlPath][httpMethod].description,
                example: example != '' ? format('{\n%s\n}', example) : '{}'
              };
            }
          });
      });
    });
  });

// assemble README markdown from gnerated resources object
when(processedSpec)
  .then(() => {
    var readme = format('%s\n\n%s\n\n%s\n\n', title, subtitle, intro);
    _.forEach(_.keys(resources), resource => {
      // add resource title and description
      readme += format('### %s\n\n%s\n\n',
        resource.toProper(),
        resources[resource].description);
      _.forEach(_.keys(resources[resource].methods), method => {
        // add httpMethod and description
        readme += format('#### %s.%s(queryObject)\n\n[%s] %s\n\n%s\n\n**Example queryObject:**\n\n```json\n%s\n```\n\n',
          resource,
          method,
          resources[resource].methods[method].httpMethod,
          resources[resource].methods[method].url,
          resources[resource].methods[method].description,
          resources[resource].methods[method].example);
      });
    });

    return when(readme);
  })
  .then(readme => console.log(readme));
