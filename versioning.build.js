const package = require('./package.json');
const fs = require('fs');
const fsEx = require('fs-extra');
const replaceFile = require('replace-in-file');
let assetVersion = package && package.assetVersion ? package.assetVersion : '1.0.0.0';
var projectVersion = package && package.projectVersion ? package.projectVersion : '1.0.0.0';

try {
  //first copy modified totext.js file from script folder into rrule node module folder
  console.log('>>copying modified totext.js file from script folder into rrule node module folder');
  let modifiedTotextFilePath = __dirname + '\\CloudApperClient\\src\\assets\\scripts\\totext.js';
  let nodeModuleFilePath = __dirname + '\\node_modules\\rrule\\dist\\esm\\src\\nlp\\totext.js';
  fsEx.copySync(modifiedTotextFilePath, nodeModuleFilePath, { overwrite: true });
} catch (error) {
  console.error('totext.js file Move error =>', error);
  throw error;
}

try {
  //rename env project version with project version from package
  console.log('>>renaming env project version with project version from package');
  const options = {
    files: 'CloudApperClient/src/environments/*.ts',
    from: /projectVersion: '(.*)'/g, //single comma
    to: "projectVersion: '" + projectVersion + "'", //single comma
    allowEmptyPaths: false
  };
  let changedFiles = replaceFile.sync(options);
  if (changedFiles == 0) {
    throw 'Please make sure file have projectVersion';
  }
  //get the config json files and rename it with appending asset version
  console.log('>>renaming config json files');
  let configDirname = __dirname + '\\CloudApperClient\\src\\assets\\config';
  let configFileNames = fs.readdirSync(configDirname);
  //exclude local,env config files
  configFileNames = configFileNames.filter(x => !x.includes('env') && !x.includes('local'));
  renameFiles(configDirname, configFileNames);
  //then get lang files and rename
  console.log('>>renaming lang files');
  let langDirname = __dirname + '\\CloudApperClient\\src\\assets\\i18n';
  let langFileNames = fs.readdirSync(langDirname);
  //filter lang files with previous version and delete
  let langFilesWithPrevVersion = langFileNames.filter(x => x.includes('_'));
  deleteFiles(langDirname, langFilesWithPrevVersion);
  //filter original lang files and delete copy them to new version
  let langOrginalFiles = langFileNames.filter(x => !x.includes('_'));
  copyFiles(langDirname, langOrginalFiles);
} catch (error) {
  console.error('File renaming error =>', error);
  throw error;
}

function renameFiles(dirname, fileNames) {
  try {
    for (let fileName of fileNames) {
      //file name does no have the current version
      if (!fileName.startsWith(assetVersion + '_')) {
        let oldFileName = dirname + '\\' + fileName;
        let newFileName = '';
        //check if file name have the previous version
        let splittedNames = fileName.split('_');
        if (splittedNames && splittedNames.length > 1) {
          //first replace previous version with new version
          let previousVersion = splittedNames[0];
          fileName = fileName.replace(previousVersion, assetVersion);
          newFileName = dirname + '\\' + fileName;
        } else {
          newFileName = dirname + '\\' + assetVersion + '_' + fileName;
        }
        fs.rename(oldFileName, newFileName, res => {
          console.log('File renamed from ' + oldFileName + ' to ' + newFileName);
        });
      }
    }
  } catch (error) {
    console.error('File renaming error =>', error);
    throw error;
  }
}

function copyFiles(dirname, fileNames) {
  try {
    for (let fileName of fileNames) {
      //file name does no have the current version
      if (!fileName.startsWith(assetVersion + '_')) {
        let oldFileName = dirname + '\\' + fileName;
        let newFileName = '';
        //check if file name have the previous version
        let splittedNames = fileName.split('_');
        if (splittedNames && splittedNames.length > 1) {
          //first replace previous version with new version
          let previousVersion = splittedNames[0];
          fileName = fileName.replace(previousVersion, assetVersion);
          newFileName = dirname + '\\' + fileName;
        } else {
          newFileName = dirname + '\\' + assetVersion + '_' + fileName;
        }
        fs.copyFile(oldFileName, newFileName, res => {
          console.log('File copied from ' + oldFileName + ' to ' + newFileName);
        });
      }
    }
  } catch (error) {
    console.error('File copied error =>', error);
    throw error;
  }
}

function deleteFiles(dirname, fileNames) {
  try {
    for (let fileName of fileNames) {
      let oldFileName = dirname + '\\' + fileName;
      fs.unlinkSync(oldFileName);
    }
  } catch (error) {
    console.error('File delete error =>', error);
    throw error;
  }
}
