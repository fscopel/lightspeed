/**
 * Relativistic Physics Utility Functions
 *
 * This module provides utilities for calculating relativistic effects
 * when dealing with speeds approaching the speed of light.
 */

// Physical constants
export const SPEED_OF_LIGHT = 299792458; // m/s
export const SPEED_OF_LIGHT_KM_S = 299792.458; // km/s
export const LIGHT_YEAR_IN_METERS = 9.4607304725808e15; // meters
export const LIGHT_YEAR_IN_KM = 9.4607304725808e12; // kilometers
export const SECONDS_PER_YEAR = 31557600; // seconds (365.25 days)
export const DAYS_PER_YEAR = 365.25;
export const HOURS_PER_DAY = 24;
export const DAYS_PER_MONTH = 30.44; // Average days per month (365.25 / 12)

/**
 * Calculate the Lorentz factor (gamma) for a given velocity as a fraction of c
 * γ = 1 / √(1 - v²/c²)
 *
 * @param velocityFraction - Velocity as a fraction of the speed of light (0 to 1)
 * @returns The Lorentz factor
 */
export function calculateLorentzFactor(velocityFraction: number): number {
  if (velocityFraction < 0 || velocityFraction >= 1) {
    throw new Error(
      "Velocity fraction must be between 0 and 1 (exclusive of 1)"
    );
  }

  const vSquaredOverCSquared = velocityFraction ** 2;
  return 1 / Math.sqrt(1 - vSquaredOverCSquared);
}

/**
 * Calculate time dilation effect
 * Δt' = Δt / γ (time passes slower for the moving observer)
 *
 * @param properTime - Time interval in the rest frame (seconds)
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Dilated time as observed from the stationary frame
 */
export function calculateTimeDilation(
  properTime: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  return properTime * gamma;
}

/**
 * Calculate length contraction effect
 * L' = L₀ / γ (length contracts in the direction of motion)
 *
 * @param properLength - Length in the rest frame (meters)
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Contracted length as observed from the stationary frame
 */
export function calculateLengthContraction(
  properLength: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  return properLength / gamma;
}

/**
 * Calculate relativistic momentum
 * p = γmv
 *
 * @param restMass - Rest mass in kg
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Relativistic momentum in kg⋅m/s
 */
export function calculateRelativisticMomentum(
  restMass: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  const velocity = velocityFraction * SPEED_OF_LIGHT;
  return gamma * restMass * velocity;
}

/**
 * Calculate relativistic kinetic energy
 * KE = (γ - 1)mc²
 *
 * @param restMass - Rest mass in kg
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Relativistic kinetic energy in Joules
 */
export function calculateRelativisticKineticEnergy(
  restMass: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  const restEnergy = restMass * SPEED_OF_LIGHT ** 2;
  return (gamma - 1) * restEnergy;
}

/**
 * Calculate total relativistic energy
 * E = γmc²
 *
 * @param restMass - Rest mass in kg
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Total relativistic energy in Joules
 */
export function calculateTotalRelativisticEnergy(
  restMass: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  const restEnergy = restMass * SPEED_OF_LIGHT ** 2;
  return gamma * restEnergy;
}

/**
 * Calculate the velocity needed to achieve a specific Lorentz factor
 * v/c = √(1 - 1/γ²)
 *
 * @param gamma - The desired Lorentz factor
 * @returns Velocity as a fraction of the speed of light
 */
export function velocityFromLorentzFactor(gamma: number): number {
  if (gamma < 1) {
    throw new Error("Lorentz factor must be >= 1");
  }

  return Math.sqrt(1 - 1 / gamma ** 2);
}

/**
 * Convert percentage of light speed to velocity fraction
 *
 * @param percentage - Percentage of light speed (0-100)
 * @returns Velocity as a fraction of the speed of light (0-1)
 */
export function percentageToFraction(percentage: number): number {
  if (percentage < 0 || percentage >= 100) {
    throw new Error("Percentage must be between 0 and 100 (exclusive of 100)");
  }
  return percentage / 100;
}

/**
 * Convert velocity fraction to percentage of light speed
 *
 * @param fraction - Velocity as a fraction of the speed of light (0-1)
 * @returns Percentage of light speed (0-100)
 */
export function fractionToPercentage(fraction: number): number {
  if (fraction < 0 || fraction >= 1) {
    throw new Error("Fraction must be between 0 and 1 (exclusive of 1)");
  }
  return fraction * 100;
}

/**
 * Convert light years to meters
 *
 * @param lightYears - Distance in light years
 * @returns Distance in meters
 */
export function lightYearsToMeters(lightYears: number): number {
  return lightYears * LIGHT_YEAR_IN_METERS;
}

/**
 * Convert meters to light years
 *
 * @param meters - Distance in meters
 * @returns Distance in light years
 */
export function metersToLightYears(meters: number): number {
  return meters / LIGHT_YEAR_IN_METERS;
}

/**
 * Calculate the apparent distance as observed due to length contraction
 * When traveling at relativistic speeds, distances in the direction of travel appear contracted
 *
 * @param properDistanceLightYears - Proper distance in light years (rest frame)
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Contracted distance in light years as observed by the traveler
 */
export function calculateContractedDistance(
  properDistanceLightYears: number,
  velocityFraction: number
): number {
  const gamma = calculateLorentzFactor(velocityFraction);
  return properDistanceLightYears / gamma;
}

/**
 * Calculate travel time for a distance in light years
 * This returns the coordinate time (time measured by a stationary observer)
 *
 * @param distanceLightYears - Distance to travel in light years
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Time in years (coordinate time)
 */
export function calculateTravelTimeInYears(
  distanceLightYears: number,
  velocityFraction: number
): number {
  // At velocity v as fraction of c, time = distance / velocity
  // Since distance is in light years and velocity is fraction of c,
  // time in years = distance_ly / velocity_fraction
  return distanceLightYears / velocityFraction;
}

/**
 * Calculate proper travel time experienced by the traveler for a distance in light years
 * This is the time experienced by someone moving at relativistic speeds
 *
 * @param distanceLightYears - Distance to travel in light years
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Proper time in years experienced by the traveler
 */
export function calculateProperTravelTimeInYears(
  distanceLightYears: number,
  velocityFraction: number
): number {
  const coordinateTimeYears = calculateTravelTimeInYears(
    distanceLightYears,
    velocityFraction
  );
  const gamma = calculateLorentzFactor(velocityFraction);
  return coordinateTimeYears / gamma;
}

/**
 * Calculate the distance that appears to be traveled by an outside observer
 * vs the contracted distance experienced by the traveler
 *
 * @param properDistanceLightYears - Actual distance in light years
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Object with both coordinate and contracted distances
 */
export function calculateDistanceEffects(
  properDistanceLightYears: number,
  velocityFraction: number
) {
  const contractedDistance = calculateContractedDistance(
    properDistanceLightYears,
    velocityFraction
  );
  const coordinateTime = calculateTravelTimeInYears(
    properDistanceLightYears,
    velocityFraction
  );
  const properTime = calculateProperTravelTimeInYears(
    properDistanceLightYears,
    velocityFraction
  );

  return {
    properDistance: properDistanceLightYears,
    contractedDistance: contractedDistance,
    contractionFactor: contractedDistance / properDistanceLightYears,
    coordinateTime: coordinateTime,
    properTime: properTime,
    properTimeFormatted: formatTime(properTime),
    coordinateTimeFormatted: formatTime(coordinateTime),
    timeDilationFactor: coordinateTime / properTime,
  };
}

/**
 * Utility interface for comprehensive relativistic calculations including distance effects
 */
export interface RelativisticEffects {
  velocityFraction: number;
  percentageOfLightSpeed: number;
  lorentzFactor: number;
  timeDilationFactor: number;
  lengthContractionFactor: number;
}

/**
 * Extended interface for distance-specific relativistic effects
 */
export interface RelativisticDistanceEffects extends RelativisticEffects {
  properDistance: number;
  contractedDistance: number;
  coordinateTime: number;
  properTime: number;
  properTimeFormatted: FormattedTime;
  coordinateTimeFormatted: FormattedTime;
}

/**
 * Calculate all major relativistic effects for a given velocity
 *
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @returns Object containing all major relativistic effects
 */
export function calculateAllEffects(
  velocityFraction: number
): RelativisticEffects {
  const gamma = calculateLorentzFactor(velocityFraction);

  return {
    velocityFraction,
    percentageOfLightSpeed: fractionToPercentage(velocityFraction),
    lorentzFactor: gamma,
    timeDilationFactor: gamma,
    lengthContractionFactor: 1 / gamma,
  };
}

/**
 * Calculate all relativistic effects including distance effects for a journey
 *
 * @param velocityFraction - Velocity as a fraction of the speed of light
 * @param distanceLightYears - Distance to travel in light years
 * @returns Object containing all relativistic effects including distance calculations
 */
export function calculateAllEffectsWithDistance(
  velocityFraction: number,
  distanceLightYears: number
): RelativisticDistanceEffects {
  const basicEffects = calculateAllEffects(velocityFraction);
  const distanceEffects = calculateDistanceEffects(
    distanceLightYears,
    velocityFraction
  );

  return {
    ...basicEffects,
    properDistance: distanceEffects.properDistance,
    contractedDistance: distanceEffects.contractedDistance,
    coordinateTime: distanceEffects.coordinateTime,
    properTime: distanceEffects.properTime,
    properTimeFormatted: distanceEffects.properTimeFormatted,
    coordinateTimeFormatted: distanceEffects.coordinateTimeFormatted,
  };
}

/**
 * Get velocity ranges with interesting relativistic effects
 */
export const INTERESTING_VELOCITIES = {
  // Noticeable effects start around 10% of light speed
  NOTICEABLE_EFFECTS: 0.1,
  // Significant effects at 50% of light speed
  SIGNIFICANT_EFFECTS: 0.5,
  // Extreme effects at 90% of light speed
  EXTREME_EFFECTS: 0.9,
  // Near-light speed at 99% (gamma ≈ 7)
  NEAR_LIGHT_SPEED: 0.99,
  // Ultra-relativistic at 99.9% (gamma ≈ 22)
  ULTRA_RELATIVISTIC: 0.999,
  // Extreme ultra-relativistic at 99.99% (gamma ≈ 71)
  EXTREME_ULTRA_RELATIVISTIC: 0.9999,
} as const;

/**
 * Common astronomical distances in light years
 */
export const ASTRONOMICAL_DISTANCES = {
  // Nearest star (Proxima Centauri)
  PROXIMA_CENTAURI: 4.24,
  // Center of Milky Way
  GALACTIC_CENTER: 26000,
  // Nearest major galaxy (Andromeda)
  ANDROMEDA_GALAXY: 2537000,
  // Observable universe radius
  OBSERVABLE_UNIVERSE: 46500000000,
  // Some example shorter distances
  ALPHA_CENTAURI: 4.37,
  SIRIUS: 8.6,
  VEGA: 25.04,
  POLARIS: 433,
} as const;

/**
 * Interface for formatted time duration
 */
export interface FormattedTime {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  totalYears: number;
  formatted: string;
}

/**
 * Format time in years to a human-readable format
 * For times less than 1 year, shows months, days, and hours
 *
 * @param timeInYears - Time duration in years
 * @returns Formatted time object with human-readable string
 */
export function formatTime(timeInYears: number): FormattedTime {
  const totalYears = timeInYears;

  if (timeInYears >= 1) {
    // For times >= 1 year, show years with decimal
    return {
      years: timeInYears,
      totalYears,
      formatted: `${timeInYears.toFixed(2)} years`,
    };
  }

  // Convert to days
  const totalDays = timeInYears * DAYS_PER_YEAR;

  if (totalDays >= DAYS_PER_MONTH) {
    // Show months and days
    const months = Math.floor(totalDays / DAYS_PER_MONTH);
    const remainingDays = Math.floor(totalDays % DAYS_PER_MONTH);
    const remainingHours = Math.floor((totalDays % 1) * HOURS_PER_DAY);

    let formatted = `${months} month${months !== 1 ? "s" : ""}`;
    if (remainingDays > 0) {
      formatted += `, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}`;
    }
    if (remainingHours > 0) {
      formatted += `, ${remainingHours} hour${remainingHours !== 1 ? "s" : ""}`;
    }

    return {
      months,
      days: remainingDays,
      hours: remainingHours,
      totalYears,
      formatted,
    };
  } else if (totalDays >= 1) {
    // Show days and hours
    const days = Math.floor(totalDays);
    const hours = Math.floor((totalDays % 1) * HOURS_PER_DAY);

    let formatted = `${days} day${days !== 1 ? "s" : ""}`;
    if (hours > 0) {
      formatted += `, ${hours} hour${hours !== 1 ? "s" : ""}`;
    }

    return {
      days,
      hours,
      totalYears,
      formatted,
    };
  } else {
    // Show hours only
    const hours = Math.round(totalDays * HOURS_PER_DAY * 10) / 10; // Round to 1 decimal place

    return {
      hours,
      totalYears,
      formatted: `${hours} hour${hours !== 1 ? "s" : ""}`,
    };
  }
}
