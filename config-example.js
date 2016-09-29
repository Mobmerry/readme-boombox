var config = {}

config.repoPath         = "";
config.watchingBranch   = "";
config.remoteName       = "origin";
config.watchingFilePath = repoPath + "";
config.slackApiToken    = "";

config.gitFetchCommand  = "git fetch";
config.gitRebaseCommand = "git rebase " + config.remoteName + config.watchingBranch;
config.gitDiffCommand   = "git diff -U15 HEAD HEAD^ " + watchingFilePath;

config.port = 3000;

config.warningHeader = ":fire: :red_circle: :point_right: *README changed* :point_left: :red_circle: :fire:\n"


module.exports = config;
