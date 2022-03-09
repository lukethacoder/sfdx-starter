import fs from "fs";
import childProcess from "child_process";

// run via `node --harmony setup-fflib.mjs e- ORG_ALIAS`

const REPOS = [
  {
    git: "https://github.com/apex-enterprise-patterns/fflib-apex-common",
    source: "fflib-apex-common",
    deployPath: "sfdx-source"
  },
  {
    git: "https://github.com/apex-enterprise-patterns/fflib-apex-mocks",
    source: "fflib-apex-mocks",
    deployPath: "sfdx-source"
  },
  {
    git: "https://github.com/apex-enterprise-patterns/force-di",
    source: "force-di",
    deployPath: "force-di"
  },
  {
    git: "https://github.com/apex-enterprise-patterns/at4dx",
    source: "at4dx",
    deployPath: "sfdx-source"
  }
];

const execute = async (command) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(childProcess.execSync(command, { stdio: "inherit" }));
    } catch (error) {
      reject(error);
    }
  });
};

const cloneAndDeployToOrg = async (orgAlias) => {
  const foldersToDeploy = [];
  await Promise.all(
    REPOS.map(async (item) => {
      const { source, git } = item;
      if (fs.existsSync(`./${source}`)) {
        console.warn("\x1b[33m%s\x1b[0m ", `${source} already exists.`);
      } else {
        console.warn("\x1b[32m%s\x1b[0m ", `Cloning ${source} from ${git}`);

        foldersToDeploy.push(item);
        return execute(`git clone ${git} ${source}`);
      }
    })
  );

  if (foldersToDeploy.length > 0) {
    console.log(
      "Deploying ",
      foldersToDeploy.map((item) => item.source)
    );

    await Promise.all(
      foldersToDeploy.map(async ({ source, deployPath }) => {
        console.warn(
          "\x1b[32m%s\x1b[0m ",
          `\nDeploying metadata ${source} to org.`
        );
        return execute(
          `sfdx force:source:deploy -p "./${source}/${deployPath}" -u ${orgAlias}`
        );
      })
    );
    console.log(`\nSuccessfully installed fflib into org ${orgAlias}\n`);
  } else {
    console.log(
      "\x1b[32m%s\x1b[0m ",
      "\nNo new folders cloned, no metadata updated"
    );
  }
};

const getArgs = () =>
  process.argv.slice(2, process.argv.length).reduce((acc, arg, key) => {
    // flags
    if (arg[0] === "-") {
      const flags = arg.slice(1, arg.length).split("");
      flags.forEach((flag) => {
        acc[flag] = process.argv[key + 3];
      });
    }
    return acc;
  }, {});

const args = getArgs();
if (!args.e) {
  console.error(
    "\x1b[31m%s\x1b[0m ",
    "Please provide org alias via the `-e` flag."
  );
} else {
  cloneAndDeployToOrg(args.e);
}
