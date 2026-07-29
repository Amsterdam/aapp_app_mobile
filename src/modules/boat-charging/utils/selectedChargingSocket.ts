export type SelectedChargingSocket = {
  socketNumber: string
  stationId: string
}

export const serializeSelectedChargingSocket = ({
  socketNumber,
  stationId,
}: SelectedChargingSocket) =>
  JSON.stringify({
    stationId,
    socketNumber,
  })

export const deserializeSelectedChargingSocket = (
  value?: string,
): SelectedChargingSocket | undefined => {
  if (!value) {
    return undefined
  }

  try {
    const parsedValue = JSON.parse(value) as Partial<SelectedChargingSocket>

    if (
      typeof parsedValue.stationId !== 'string' ||
      typeof parsedValue.socketNumber !== 'string'
    ) {
      return undefined
    }

    return {
      stationId: parsedValue.stationId,
      socketNumber: parsedValue.socketNumber,
    }
  } catch {
    return undefined
  }
}
