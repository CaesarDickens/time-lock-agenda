import { task } from "hardhat/config";

task("study-schedule:deploy", "Deploy StudySchedule contract")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;

    console.log("Deploying StudySchedule contract...");

    const StudySchedule = await ethers.getContractFactory("StudySchedule");
    const studySchedule = await StudySchedule.deploy();

    await studySchedule.waitForDeployment();

    const address = await studySchedule.getAddress();
    console.log(`StudySchedule deployed to: ${address}`);

    // Save deployment info
    const deploymentInfo = {
      address,
      network: hre.network.name,
      deployer: (await ethers.getSigners())[0].address,
      timestamp: new Date().toISOString(),
    };

    console.log("Deployment info:", deploymentInfo);
    return deploymentInfo;
  });

task("study-schedule:stats", "Get contract statistics")
  .addParam("address", "Contract address")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const contract = await ethers.getContractAt("StudySchedule", taskArgs.address);

    console.log(`Getting statistics for contract at ${taskArgs.address}`);

    const [owner] = await ethers.getSigners();
    const scheduleCount = await contract.getUserScheduleCount(owner.address);

    console.log(`Schedules for ${owner.address}: ${scheduleCount}`);

    return {
      contractAddress: taskArgs.address,
      userSchedules: scheduleCount.toString(),
    };
  });

task("study-schedule:verify", "Verify contract on Etherscan")
  .addParam("address", "Contract address to verify")
  .setAction(async (taskArgs, hre) => {
    console.log(`Verifying contract at ${taskArgs.address} on Etherscan...`);

    try {
      await hre.run("verify:verify", {
        address: taskArgs.address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.error("❌ Contract verification failed:", error);
    }
  });
