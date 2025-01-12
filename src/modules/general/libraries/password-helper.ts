export enum PasswordPolicy {
  easy = 1,
  medium = 2,
  hard = 3
}

export interface PasswordScore {
  hasNormalLetter: boolean;
  hasCapitalLetter: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
  passwordLength: number;
}

export function checkPasswordScore(password: string): PasswordScore {
  const score: PasswordScore = {
    hasNormalLetter: (/[a-z]+/).test(password),
    hasCapitalLetter: (/[A-Z]+/).test(password),
    hasNumber: (/[0-9]+/).test(password),
    hasSpecialCharacter: (/[$@#&!]+/).test(password),
    passwordLength: password.length,
  };
  return score;
}
export function calculateTotalScore(score: PasswordScore, currentPolicy: PasswordPolicy): number {
  let result = 0;

  if (score.hasNormalLetter) { result += 1; }
  if (score.hasCapitalLetter) { result += 1; }
  if (score.hasNumber) { result += 1; }
  if (score.hasSpecialCharacter) { result += 1; }

  let requiredLength = 6;
  switch (currentPolicy) {
    case PasswordPolicy.easy:
      requiredLength = 6;
      break;
    case PasswordPolicy.medium:
      requiredLength = 7;
      break;
    case PasswordPolicy.hard:
      requiredLength = 8;
      break;
    default:
      requiredLength = 6;
      break;
  }
  if (score.passwordLength >= requiredLength) { result += 1; }

  return result;
}

export const CURRENT_PASSWORD_POLICY = PasswordPolicy.hard;
