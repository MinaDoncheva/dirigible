/*
 * Generated by Eclipse Dirigible based on model and template.
 *
 * Do not modify the content as it may be re-generated again.
 */
const schemaTemplateManager = dirigibleRequire("template-application-schema/template/template");
const daoTemplateManager = dirigibleRequire("template-application-dao/template/template");
const generateUtils = dirigibleRequire("ide-generate-service/template/generateUtils");
const parameterUtils = dirigibleRequire("ide-generate-service/template/parameterUtils");

exports.generate = function (model, parameters) {
    model = JSON.parse(model).model;
    let templateSources = exports.getTemplate(parameters).sources;
    parameterUtils.process(model, parameters)
    return generateUtils.generateFiles(model, parameters, templateSources);
};

exports.getTemplate = function (parameters) {
    let schemaTemplate = schemaTemplateManager.getTemplate(parameters);
    let daoTemplate = daoTemplateManager.getTemplate(parameters);

    let templateSources = [];
    templateSources = templateSources.concat(schemaTemplate.sources);
    templateSources = templateSources.concat(daoTemplate.sources);

    return {
        name: "Application - Data",
        description: "Application with a Database Schema and DAO",
        extension: "model",
        sources: templateSources,
        parameters: parameterUtils.getUniqueParameters(schemaTemplate.parameters, daoTemplate.parameters)
    };
};
