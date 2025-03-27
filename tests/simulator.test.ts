import {
  SimulatorContext,
  SimpleStrategy,
} from "../src/services/simulator.service";

describe("Simulator", () => {
  it("should calculate total benefits", () => {
    const simulator = new SimulatorContext(new SimpleStrategy());
    const data = simulator.calculate(100, 3);
  });
});
