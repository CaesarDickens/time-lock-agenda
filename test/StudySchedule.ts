import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("StudySchedule", function () {
  async function deployStudyScheduleFixture() {
    const [owner, user1, user2] = await ethers.getSigners();

    const StudySchedule = await ethers.getContractFactory("StudySchedule");
    const studySchedule = await StudySchedule.deploy();

    return { studySchedule, owner, user1, user2 };
  }

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const { studySchedule } = await loadFixture(deployStudyScheduleFixture);
      expect(await studySchedule.getAddress()).to.be.properAddress;
    });

    it("Should have correct initial state", async function () {
      const { studySchedule, owner } = await loadFixture(deployStudyScheduleFixture);

      const scheduleCount = await studySchedule.getUserScheduleCount(owner.address);
      expect(scheduleCount).to.equal(0);
    });
  });

  describe("Schedule Creation", function () {
    it("Should create a new schedule", async function () {
      const { studySchedule, user1 } = await loadFixture(deployStudyScheduleFixture);

      const date = Math.floor(Date.now() / 1000);
      const targetGoals = 5;
      const completedGoals = 3;
      const priority = 2;

      await expect(
        studySchedule.connect(user1).createOrUpdateSchedule(
          date,
          ethers.ZeroHash, // encrypted values would be provided in real usage
          ethers.ZeroHash,
          ethers.ZeroHash,
          "0x" // input proof would be provided
        )
      ).to.emit(studySchedule, "ScheduleCreated");

      const scheduleCount = await studySchedule.getUserScheduleCount(user1.address);
      expect(scheduleCount).to.equal(1);
    });

    it("Should update existing schedule", async function () {
      const { studySchedule, user1 } = await loadFixture(deployStudyScheduleFixture);

      const date = Math.floor(Date.now() / 1000);

      // Create initial schedule
      await studySchedule.connect(user1).createOrUpdateSchedule(
        date,
        ethers.ZeroHash,
        ethers.ZeroHash,
        ethers.ZeroHash,
        "0x"
      );

      // Update the same schedule
      await expect(
        studySchedule.connect(user1).createOrUpdateSchedule(
          date,
          ethers.ZeroHash,
          ethers.ZeroHash,
          ethers.ZeroHash,
          "0x"
        )
      ).to.emit(studySchedule, "ScheduleUpdated");

      const scheduleCount = await studySchedule.getUserScheduleCount(user1.address);
      expect(scheduleCount).to.equal(1); // Should still be 1
    });

    it("Should reject invalid user", async function () {
      const { studySchedule } = await loadFixture(deployStudyScheduleFixture);

      const date = Math.floor(Date.now() / 1000);

      await expect(
        studySchedule.getEncryptedTargetGoals(ethers.ZeroAddress, date)
      ).to.be.revertedWith("Schedule does not exist");
    });
  });

  describe("User Statistics", function () {
    it("Should return correct statistics for user with schedules", async function () {
      const { studySchedule, user1 } = await loadFixture(deployStudyScheduleFixture);

      const date1 = Math.floor(Date.now() / 1000);
      const date2 = date1 + 86400; // Next day

      // Create two schedules
      await studySchedule.connect(user1).createOrUpdateSchedule(
        date1, ethers.ZeroHash, ethers.ZeroHash, ethers.ZeroHash, "0x"
      );
      await studySchedule.connect(user1).createOrUpdateSchedule(
        date2, ethers.ZeroHash, ethers.ZeroHash, ethers.ZeroHash, "0x"
      );

      const [totalSchedules] = await studySchedule.getUserStatistics(user1.address);
      expect(totalSchedules).to.equal(2);
    });

    it("Should return zero statistics for user without schedules", async function () {
      const { studySchedule, user1 } = await loadFixture(deployStudyScheduleFixture);

      const [totalSchedules, completedPercentage] = await studySchedule.getUserStatistics(user1.address);
      expect(totalSchedules).to.equal(0);
      expect(completedPercentage).to.equal(0);
    });
  });
});
