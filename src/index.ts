import cli from "./cli";
import { fromComplexityPerFileToStringPerFile } from "./from-complexity-per-file-to-string-per-file";
import {
  ComplexityPerFile,
  computeComplexityPerFile
} from "./compute-complexity-per-file";
import {
  CommitCountPerFile,
  countCommitsPerFile
} from "./count-commits-per-file";

main();

async function main(): Promise<void> {
  if (!cli.args || !cli.args.length) {
    cli.help();
    process.exit(0);
  }

  const [directory] = cli.args;
  const options = { firstParent: cli.firstParent, since: cli.since };

  const commitCount: CommitCountPerFile[] = await countCommitsPerFile(
    directory,
    options
  );

  const filesComplexity: ComplexityPerFile[] = await computeComplexityPerFile(
    commitCount
  );

  fromComplexityPerFileToStringPerFile(filesComplexity, cli).forEach(line =>
    console.log(line)
  );
}