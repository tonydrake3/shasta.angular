import {gitVersion} from './version-git';

function getGitVersion() {
    return gitVersion.version + ' ' + gitVersion.commit + ' ' + gitVersion.branch;
}

export const GITVERSION = getGitVersion();