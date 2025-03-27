import { Request, Response, Router } from "express";
import { StrategyRequestInput } from "../../services/types";
import {
  CompoundStrategy,
  SimpleStrategy,
  SimulatorContext,
} from "../../services/simulator.service";

export const api: Router = Router();

function simulateController(req: Request, res: Response) {
  const body = req.body;
  const periods = [3, 6, 9, 12];
  const strategies = {
    simple: SimpleStrategy,
    compound: CompoundStrategy,
  };

  if (!periods.includes(Number(body.duration))) {
    return res.status(400).json({ message: "Valid months are 3, 6, 9, 12" });
  }

  const simulator = new SimulatorContext(
    new strategies[body.type as "simple" | "compound"]()
  );
  const result = simulator.calculate(
    Number(body.capital),
    Number(body.duration) as 3 | 6 | 9 | 12
  );
  return res.status(200).json(result);
}

api.post("/simulate", simulateController as any);
