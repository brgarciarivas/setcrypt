#!/usr/bin/env node

'use strict';

process.bin = process.title = 'setlife';

var program = require('commander');
var pkg = require('./package.json');
var fs = require('fs-extra');
var path = require('path');
var ejs = require('ejs');
var _ = require('lodash');

var generateRnComponent = function(name, options) {
    console.log('Creating ' + name + ' component...');

    var templatePath = path.join(process.cwd(), 'src/templates', 'component.ejs');
    var destinationPath = path.join(process.cwd(), 'src/components', name + '.js');
    var redux = options.redux;

    fs.readFile(templatePath, 'utf8', function(err, data) {
        var component = ejs.render(data, {
            name: name,
            redux: options.redux || false
        });

        fs.writeFile(destinationPath, component);
        console.log('Created component:  ' + name + '...');
    });
};

// Parse command line options

program
    .version(pkg.version)
    .usage('<command> [options]');

program
    .command('create-rn-component <name>')
    .option('-r, --redux', 'Connect Redux state mappings')
    .description('Generate a new React Native component.')
    .action(function(name, options) {
        generateRnComponent(name, options);
    });


// Failsafe that shows the help dialogue if the command is not recognized (`$ react xyz`)
program.on('*', function(opt) {
    program.help();
});

program.parse(process.argv);

// Handle case where no command is passed (`$ react`)
if (!process.argv.slice(2).length) {
    program.help();
}