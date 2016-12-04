'use strict';

var path = require('path');
var format = require('util').format;
var when = require('when');
var fs = require('fs');
var _ = require('lodash');

var jsonParse = when.lift(JSON.parse);

var swaggerDef = process.env.SWAGGER_JSON;

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

// extend String prototype
String.prototype.toProper = function() {
  return this[0].toUpperCase() + this.slice(1);
};

var title = '# ';
var subtitle = '#### ';
var version = 'File version v';
var intro = '';
var resources = {};
var modesl = {};
var swaggerApiBase = '';

var processedSpec = getSpec(swaggerDef)

  // proces spec and initialize varibale content
  .then(spec => {
    title += spec.info.title;
    subtitle += spec.info.description;
    version += spec.info.version;
    intro += format('*Note: This is a generated README file. For details on the data types in the examples, reference the developer docs [here](%s).*', spec.externalDocs.url);
    swaggerApiBase += format('%s://%s', spec.schemes[0], path.join(spec.host, spec.basePath));
    _.forEach(spec.tags, tag => {
      resources[tag.name] = { description: tag.description, methods: {} };
    });
    return when(spec);
  })

  // process resources
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

              // add method to resources to object
              resources[tag].methods[spec.paths[urlPath][httpMethod].operationId] = {
                url: swaggerApiBase + urlPath,
                httpMethod: httpMethod,
                description: spec.paths[urlPath][httpMethod].description,
                example: example != '' ? format('{\n%s\n}', example) : '{}'
              };
            }
          });
      });
    });

    return spec;
  });

// assemble README markdown from gnerated resources object
when(processedSpec)
  .then(spec => {
    // add readme preamble
    var readme = format('%s\n\n%s\n\n%s\n\n%s\n\n', title, subtitle, version, intro);

    // add API methods
    readme += '## API Methods\n\n';
    _.forEach(_.keys(resources), resource => {
      // add resource title and description
      readme += format('### %s\n\n%s\n\n',
        resource.toProper(),
        resources[resource].description);

      _.forEach(_.keys(resources[resource].methods), method => {
        // add httpMethod and description
        readme += format('#### %s.%s(queryObject)\n\n%s\n\n**Example queryObject:**\n\n```json\n%s\n```\n\n',
          resource,
          method,
          resources[resource].methods[method].description,
          resources[resource].methods[method].example);
      });
    });

    // add API models
    readme += '## API Models\n\n';
    _.forEach(_.keys(spec.definitions), model => {
      readme += format('#### %s\n\n', model);
      var properties = _.keys(spec.definitions[model].properties);
      _.forEach(properties, property => {
        var type = spec.definitions[model].properties[property].type;
        var description = spec.definitions[model].properties[property].description;
        readme += format('- `%s` : **[%s]** %s\n', property, type, description);
      });
      readme += '\n\n';
    });

    return when(readme);
  })
  .then(readme => console.log(readme));
