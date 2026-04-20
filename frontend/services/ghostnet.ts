import { detectAttack } from "./api";

export async function runGhostnetCheck(identifier: string) {
  return detectAttack(identifier, true);
}
