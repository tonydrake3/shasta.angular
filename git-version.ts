import fs = require('fs');
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

const exec = require('child_process').exec;

const getCommit = new Observable<string>(s => {
    exec('git log --pretty=format:"%h" -n 1',
        function (error: Error, stdout: Buffer, stderr: Buffer) {
            if (error !== null) {
                console.log('git error: ' + error + stderr);
            }
            s.next(stdout.toString().trim());
            s.complete();
        });
});

const getBranchFromGit = new Observable<string>(s => {
    exec('git branch | grep \\* | cut -d " " -f2',
        function (error: Error, stdout: Buffer, stderr: Buffer) {
            if (error !== null) {
                console.log('git error: ' + error + stderr);
            }
            s.next(stdout.toString().trim());
            s.complete();
        });
});

const getBranchFromVar = new Observable<string>(s => {
    exec('echo $GIT_BRANCH',
        function (error: Error, stdout: Buffer, stderr: Buffer) {
            if (error !== null) {
                console.log('git error: ' + error + stderr);
            }
            s.next(stdout.toString().trim());
            s.complete();
        });
});

Observable
    .combineLatest(getCommit, getBranchFromGit, getBranchFromVar)
    .subscribe(([commit, branchGit, branchVar]) => {

        const branch = branchVar ? branchVar : branchGit;

        console.log(`version: '${process.env.npm_package_version}', commit: '${commit}', branch: '${branch}'`);

        const content = '// this file is automatically generated by git-version.ts script\n' +
            `export const versions = {
              version: '${process.env.npm_package_version}',
              commit: '${commit}',
              branch: '${branch}'};\n`;

        fs.writeFileSync(
            'src/environments/versions.ts',
            content,
            {encoding: 'utf8'}
        );
    });
