
const chalk = require('chalk');
const inquirer = require('inquirer')
const path = require('path');
const fs = require('fs-extra');
const download = require('download-git-repo');
const ora = require('ora');

function downloadTmp(path, projectName) {
  const spinner = ora('creating...').start();
  download('github:poyiding/react-admin#main', path, function (err) {
    if(!err) {
      spinner.succeed(chalk.green('Successfully created project'))
      console.log(`cd ${chalk.cyan(projectName)}`)
      console.log(`yarn install or npm install `)
      console.log('yarn start \r\n')
    }
    else {
      console.log(chalk.red(err))
    }
  })
}

module.exports = async function create(name) {
  const cwd = process.cwd();
  const targetWorkspace = path.join(cwd, name);
  
  if (fs.pathExistsSync(targetWorkspace)) {
    const { overWrite } = await inquirer.prompt([
      {
        type: 'list', //type：input,confirm,list,rawlist,checkbox,password...
        name: 'overWrite', // key 
        message: `Target directory already exists ${name}，please confirm overWrite it or not`, // 提示信息
        choices: [{
          name: 'yes',
          value: true,
        }, {
          name: 'no',
          value: false,
        }]
      }
    ])
    if (overWrite) {
      fs.remove(targetWorkspace);
      downloadTmp(targetWorkspace, name)
    } else {
      console.log(chalk.red('please create project in a empty dir'));
    }
  } else {
    downloadTmp(targetWorkspace, name)
  }

};
